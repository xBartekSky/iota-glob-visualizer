const RPC_URL = process.env.EXPO_PUBLIC_RPC_URL;
const GEO_API_URL = process.env.EXPO_PUBLIC_GEO_API_URL;
const DNS_API_URL = process.env.EXPO_PUBLIC_DNS_API_URL;

export const extractDomain = (netAddress: string | null): string | null => {
  if (!netAddress) return null;
  const parts = netAddress.split("/");
  const dnsIndex = parts.indexOf("dns");
  const ipIndex = parts.indexOf("ip4");

  if (dnsIndex !== -1 && parts.length > dnsIndex + 1)
    return parts[dnsIndex + 1];
  if (ipIndex !== -1 && parts.length > ipIndex + 1) return parts[ipIndex + 1];

  return null;
};

const resolveDomainToIp = async (
  domain: string,
): Promise<{ domain: string; ip: string | null }> => {
  try {
    const res = await fetch(`${DNS_API_URL}?name=${domain}&type=A`);
    const json = await res.json();
    if (json.Answer) {
      const aRecord = json.Answer.find((a: any) => a.type === 1);
      if (aRecord) return { domain, ip: aRecord.data };
    }
  } catch (error) {}
  return { domain, ip: null };
};

export const fetchIotaValidators = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  let response;
  try {
    response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "iotax_getLatestIotaSystemState",
        params: [],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (err: any) {
    throw new Error(err.name === "AbortError" ? "RPC timeout." : err.message);
  }

  if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);
  const json = await response.json();
  if (json.error) throw new Error(`Błąd RPC: ${json.error.message}`);

  const validators = json.result.activeValidators;

  const domains = [
    ...new Set(
      validators.map((v: any) => extractDomain(v.netAddress)).filter(Boolean),
    ),
  ] as string[];
  const resolvedRecords = await Promise.all(domains.map(resolveDomainToIp));
  const validIps = resolvedRecords
    .filter((r) => r.ip !== null)
    .map((r) => r.ip);

  let geoData: any[] = [];
  if (validIps.length > 0) {
    try {
      const geoResponse = await fetch(GEO_API_URL, {
        method: "POST",
        body: JSON.stringify(validIps),
      });
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
      }
    } catch (error) {
      console.warn("Error Geo API:", error);
    }
  }

  const validatorsWithGeo = validators.map((v: any) => {
    const domain = extractDomain(v.netAddress);
    const resolved = resolvedRecords.find((r) => r.domain === domain);
    const geo =
      resolved && resolved.ip
        ? geoData.find(
            (g: any) => g.query === resolved.ip && g.status === "success",
          )
        : null;

    if (geo) {
      return {
        ...v,
        lat: geo.lat + (Math.random() - 0.5) * 1.5,
        lng: geo.lon + (Math.random() - 0.5) * 1.5,
      };
    }
    return v;
  });

  const locatedValidators = validatorsWithGeo.filter(
    (v: any) => v.lat !== undefined && v.lng !== undefined,
  );

  return locatedValidators;
};

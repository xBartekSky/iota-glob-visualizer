const RPC_URL = process.env.EXPO_PUBLIC_RPC_URL;

export const fetchCurrentEpoch = async () => {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "iotax_getLatestIotaSystemState",
      params: [],
    }),
  });
  const json = await response.json();
  return json.result?.epoch ?? "--";
};

export const fetchRecentBlocks = async () => {
  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "iota_getCheckpoints",
        params: [null, 2, true],
      }),
    });
    const json = await response.json();
    if (json.error) throw new Error(json.error.message);

    return json.result.data.map((checkpoint: any) => ({
      blockNumber: checkpoint.sequenceNumber,
      rawValidatorSignature: checkpoint.validatorSignature,
      round: checkpoint.epoch,
      transactions: checkpoint.transactions
        ? checkpoint.transactions.length
        : 0,
    }));
  } catch (error) {
    console.warn("API Error (Recent Blocks):", error);
    return [];
  }
};

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useValidators } from "./useValidators";
import {
  fetchCurrentEpoch,
  fetchRecentBlocks,
} from "../services/NetworkService";

export const useNetworkDashboard = () => {
  const { data: validators, isLoading: isValidatorsLoading } = useValidators();

  const { data: currentEpoch } = useQuery({
    queryKey: ["iotaEpoch"],
    queryFn: fetchCurrentEpoch,
    refetchInterval: 60000,
  });

  const { data: recentBlocksRaw } = useQuery({
    queryKey: ["recentBlocks"],
    queryFn: fetchRecentBlocks,
    refetchInterval: 1500,
  });

  const processedBlocks = useMemo(() => {
    if (!recentBlocksRaw || !validators) return [];
    const validatorMap = new Map<string, string>(
      validators.map((v: any) => [v.protocolPubkeyBytes, v.name]),
    );
    return recentBlocksRaw.map((block: any) => ({
      ...block,
      validatorName:
        validatorMap.get(block.rawValidatorSignature) ||
        `0x${block.rawValidatorSignature.slice(0, 8)}...`,
    }));
  }, [recentBlocksRaw, validators]);

  const stats = useMemo(() => {
    if (!validators || validators.length === 0) return null;

    const activeCount = validators.length;

    const totalStakeRaw = validators.reduce(
      (acc: bigint, v: any) => acc + BigInt(v?.stakingPoolIotaBalance ?? 0),
      BigInt(0),
    );

    const totalVP = validators.reduce(
      (acc: number, v: any) => acc + Number(v?.votingPower ?? 0),
      0,
    );

    const totalCommission = validators.reduce(
      (acc: number, v: any) => acc + Number(v?.commissionRate ?? 0),
      0,
    );

    const top15 = [...validators]
      .sort(
        (a: any, b: any) =>
          Number(b?.votingPower ?? 0) - Number(a?.votingPower ?? 0),
      )
      .slice(0, 15);

    return {
      activeCount,
      totalStake: Number(totalStakeRaw / BigInt(1_000_000_000)),
      totalVP,
      avgComm: (totalCommission / activeCount / 100).toFixed(2),
      leaderName: top15[0]?.name ?? "Unknown",
      leaderLogo: top15[0]?.imageUrl ?? null,
    };
  }, [validators]);

  const getInitial = (name: string) => {
    if (!name || name === "Unknown") return "?";
    if (name.startsWith("0x")) return name.charAt(2).toUpperCase();
    return name.charAt(0).toUpperCase();
  };

  return {
    validators,
    isLoading: isValidatorsLoading,
    currentEpoch,
    processedBlocks,
    latestBlock: processedBlocks.length > 0 ? processedBlocks[0] : null,
    stats,
    getInitial,
  };
};

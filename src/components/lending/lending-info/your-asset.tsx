import { Badge } from "@/components/ui/badge";
import { POOL_ADDRESS, POOL_ABI } from "@/constants/lending";
import useDialog from "@/hooks/use-dialog";
import { AssetType } from "@/types/lending";
import { formatToDecimals } from "@/utils";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";

interface YourAssetProps extends AssetType {
  balance?: number;
}

function YourAsset({ type, balance }: YourAssetProps) {
  const { address } = useAccount();
  const {
    context: { open },
  } = useDialog();
  const { data, refetch } = useReadContract({
    address: POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: "getUserAccountData",
    args: [address!],
    query: {
      refetchInterval: 3000,
    },
  });

  const collateral = useMemo(() => {
    if (type === "supply") {
      return formatToDecimals(balance);
    } else return formatToDecimals(Number(data?.[1]) / Math.pow(10, 36));
  }, [balance, data, type]);

  const borrowused = useMemo(() => {
    return (Number(data?.[1]) / Number(data?.[2])) * 100;
  }, [data]);

  useEffect(() => {
    refetch();
  }, [open, refetch]);

  return (
    <div className="flex gap-2">
      <Badge variant="outline" className="min-h-9 text-sm text-white">
        Balance ${collateral}
      </Badge>

      <Badge variant="outline" className="min-h-9 text-sm text-white">
        APY 1.60%
      </Badge>

      {type === "supply" ? (
        <Badge variant="outline" className="min-h-9 text-sm text-white">
          Collateral ${formatToDecimals(Number(data?.[0]) / Math.pow(10, 36))}
        </Badge>
      ) : (
        <Badge variant="outline" className="min-h-9 text-sm text-white">
          Borrow power used {formatToDecimals(borrowused, 3)}%
        </Badge>
      )}
    </div>
  );
}

export default YourAsset;

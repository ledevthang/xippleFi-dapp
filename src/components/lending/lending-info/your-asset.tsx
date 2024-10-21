import { Badge } from "@/components/ui/badge";
import { ADDRESS, POOL_ABI } from "@/constants/lending";
import { AssetType } from "@/types/lending";
import { useAccount, useReadContract } from "wagmi";

function YourAsset({ type }: AssetType) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: ADDRESS,
    abi: POOL_ABI,
    functionName: "getUserAccountData",
    args: [address!],
  });

  return (
    <div className="flex gap-2">
      <Badge variant="outline" className="text-sm text-white">
        Balance ${Number(data?.[0])}
      </Badge>

      <Badge variant="outline" className="text-sm text-white">
        APY 1.60%
      </Badge>

      {type === "supply" ? (
        <Badge variant="outline" className="text-sm text-white">
          Collateral ${Number(data?.[0])}
        </Badge>
      ) : (
        <Badge variant="outline" className="text-sm text-white">
          Borrow power used {Number(data?.[0])}%
        </Badge>
      )}
    </div>
  );
}

export default YourAsset;

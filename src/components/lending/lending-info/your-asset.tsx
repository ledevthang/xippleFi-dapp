import { Badge } from "@/components/ui/badge";
import { AssetType } from "@/types/lending";

function YourAsset({ type }: AssetType) {
  return (
    <div className="flex gap-2">
      <Badge variant="outline" className="text-sm text-white">
        Balance $1.13
      </Badge>

      <Badge variant="outline" className="text-sm text-white">
        APY 1.60%
      </Badge>

      {type === "supply" ? (
        <Badge variant="outline" className="text-sm text-white">
          Collateral $1.13
        </Badge>
      ) : (
        <Badge variant="outline" className="text-sm text-white">
          Borrow power used 25.86%
        </Badge>
      )}
    </div>
  );
}

export default YourAsset;

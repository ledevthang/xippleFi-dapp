import { AssetType } from "@/types/balance";
import YourAsset from "./your-asset";
import YourAssetDetails from "./your-asset-details";

type YourBalanceProps = AssetType;

const TITLE = {
  supply: "Your supplies",
  borrow: "Your borrows",
};

function YourBalance({ type }: YourBalanceProps) {
  const title = TITLE[type];
  return (
    <div className={`bg-color-primary flex-1 rounded-sm p-4`}>
      <div>
        <h3 className="mb-8 text-lg font-bold">{title}</h3>
        <YourAsset type={type} />
        <YourAssetDetails type={type} />
      </div>
    </div>
  );
}

export default YourBalance;

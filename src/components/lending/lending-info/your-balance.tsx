import { AssetType } from "@/types/lending";
import YourAsset from "./your-asset";
import YourAssetDetails from "./your-asset-details";

type YourBalanceProps = AssetType;

const TITLE = {
  supply: "Your supplies",
  borrow: "Your borrows",
};

function YourBalance({ type }: YourBalanceProps) {
  const title = TITLE[type];
  const bgStyles =
    type === "supply" ? "bg-color-primary" : "bg-color-secondary";

  return (
    <div className={`${bgStyles} rounded-sm p-4`}>
      <div>
        <h3 className="mb-8 text-lg font-bold">{title}</h3>
        <YourAsset type={type} />
        <YourAssetDetails type={type} />
      </div>
    </div>
  );
}

export default YourBalance;

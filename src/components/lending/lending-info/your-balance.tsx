import { AssetType } from "@/types/balance";
import YourAsset from "./your-asset";
import YourAssetDetails from "./your-asset-details";

interface YourBalanceProps extends AssetType {}

const TITLE = {
  supply: "Your supplies",
  borrow: "Your borrows",
};

function YourBalance({ type }: YourBalanceProps) {
  const title = TITLE[type];
  const backgroundColor =
    type === "supply" ? "bg-color-primary" : "bg-color-secondary";

  return (
    <div className={`${backgroundColor} flex-1 rounded-sm p-4`}>
      <div>
        <h3 className="mb-8 text-lg font-medium text-[#e6e6e6]">{title}</h3>
        <YourAsset type={type} />
        <YourAssetDetails type={type} />
      </div>
      <div></div>
    </div>
  );
}

export default YourBalance;

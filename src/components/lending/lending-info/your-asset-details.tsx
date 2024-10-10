import { Switch } from "@/components/ui/switch";
import { AssetType } from "@/types/balance";
import { formatCurrency, formatToTwoDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "../common/asset";

function YourAssetDetails({ type }: AssetType) {
  const columns = YOUR_ASSET_TABLE_HEADER[type];
  return (
    <div className="mt-6">
      <Header columns={columns} />
      <div className="flex flex-col gap-3">
        <Row>
          <div className={`${columnStyles} col-span-2`}>
            <Asset
              logo="https://app.aave.com/icons/tokens/pol.svg"
              symbol="POL"
            />
          </div>
          <div className={`${columnStyles} justify-end`}>
            <div className="flex flex-col items-end">
              <p>{formatToTwoDecimals(3)}</p>
              <p className="text-xs">{formatCurrency(2.3)}</p>
            </div>
          </div>
          <div className={`${columnStyles} justify-end`}>
            <p>1.60%</p>
          </div>
          <div className={`${columnStyles} justify-end`}>
            {type === "supply" ? <Switch className="" /> : "26.00%"}
          </div>
        </Row>
      </div>
    </div>
  );
}

export default YourAssetDetails;

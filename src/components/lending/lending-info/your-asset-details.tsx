import { Switch } from "@/components/ui/switch";
import { formatCurrency, formatToTwoDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "../common/asset";
import WithdrawDialog from "../dialog/withdraw-dialog";
import { AssetType } from "@/types/lending";
import useDialog from "@/hooks/use-dialog";

type YourAssetDetailsProps = AssetType;

function YourAssetDetails({ type }: YourAssetDetailsProps) {
  const columns = YOUR_ASSET_TABLE_HEADER[type];
  const { onChange } = useDialog();

  const handleOpenWithDrowDialog = () => {
    onChange({
      open: true,
      title: "WithDrow POL",
      content: <WithdrawDialog />,
    });
  };

  const handleOpenRepayDialog = () => {
    onChange({
      open: true,
      title: "Repay POL",
      content: <WithdrawDialog />,
    });
  };

  return (
    <div className="mt-6">
      <Header columns={columns} />
      <div className="flex flex-col gap-3">
        <Row
          onClick={
            type === "supply" ? handleOpenWithDrowDialog : handleOpenRepayDialog
          }
        >
          <div className={`${columnStyles} col-span-2`}>
            <Asset symbol="BTC" />
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

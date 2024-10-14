import { formatToTwoDecimals } from "@/utils";
import Asset from "../common/asset";
import { ASSETS_TO_SUPPLY_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import { SupplyAsset } from "@/types/lending";
import SupplyDialog from "../dialog/supply-dialog";
import useDialog from "@/hooks/use-dialog";

interface SupplyAssetsProps {
  data: SupplyAsset[];
}

function SupplyAssets({ data }: SupplyAssetsProps) {
  const { onChange } = useDialog();

  const handleOpenSupplyAssetDialog = () => {
    onChange({
      open: true,
      title: "Supply POL",
      content: <SupplyDialog />,
    });
  };

  return (
    <div className="mt-10 flex !h-fit flex-1 flex-col">
      <div className="mb-7 flex h-full items-center gap-9">
        <div className="h-[28px] w-[2px] bg-[#69e2db]"></div>
        <h3 className={`text-xl font-bold`}>Assets to supply</h3>
      </div>

      <div className="bg-color-primary flex-1 rounded-sm p-4">
        <Header columns={ASSETS_TO_SUPPLY_HEADER} className="grid-cols-4" />
        <div className="flex flex-col gap-5">
          {data.map(({ id, symbol, apy }) => (
            <Row
              onClick={handleOpenSupplyAssetDialog}
              key={id}
              className="grid-cols-4"
            >
              <div className={`${columnStyles} col-span-2`}>
                <Asset symbol={symbol} />
              </div>
              <div className={`${columnStyles} justify-end`}>
                <p>{formatToTwoDecimals(apy)}%</p>
              </div>
              <div className={`${columnStyles} justify-end`}>
                <span>
                  {formatToTwoDecimals(0)} {symbol}
                </span>
              </div>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupplyAssets;

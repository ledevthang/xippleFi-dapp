import { formatToDecimals } from "@/utils";
import { ASSETS_TO_BORROW_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import { LendingAssets } from "@/types/lending";
import BorrowDialog, { BorrowDialogProps } from "../dialog/borrow-dialog";
import useDialog from "@/hooks/use-dialog";
import Asset from "@/components/common/asset";

interface BorrowAssetsProps {
  data: LendingAssets[];
}

function BorrowAssets({ data }: BorrowAssetsProps) {
  const { onChange } = useDialog();

  const handleOpenBorrowAssetDialog = (props: BorrowDialogProps) => {
    onChange({
      open: true,
      title: "Borrow POL",
      content: <BorrowDialog {...props} />,
    });
  };

  return (
    <div className="mt-10 flex !h-fit flex-1 flex-col">
      <div className="mb-7 flex items-center gap-9">
        <div className="h-[28px] w-[2px] bg-[#69e2db]"></div>
        <h3 className={`text-xl font-bold`}>Assets to borrow</h3>
      </div>
      <div className="bg-color-secondary flex-1 rounded-sm p-4">
        <Header columns={ASSETS_TO_BORROW_HEADER} className="!grid-cols-4" />
        <div className="flex flex-col gap-5">
          {data.map(({ symbol, apy, liquidity }) => (
            <Row
              key={symbol}
              onClick={() =>
                handleOpenBorrowAssetDialog({
                  symbol,
                })
              }
              className="!grid-cols-4"
            >
              <div className={`${columnStyles} col-span-2`}>
                <Asset symbol={symbol} />
              </div>
              <div className={`${columnStyles} justify-end`}>
                <p>{formatToDecimals(apy)}%</p>
              </div>
              <div className={`${columnStyles} justify-end`}>
                <span>{liquidity}</span>
              </div>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BorrowAssets;

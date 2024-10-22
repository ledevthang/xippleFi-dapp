import { formatToDecimals, truncateCurrency } from "@/utils";
import { ASSETS_TO_BORROW_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import BorrowDialog, { BorrowDialogProps } from "../dialog/borrow-dialog";
import useDialog from "@/hooks/use-dialog";
import Asset from "@/components/common/asset";
import { useReadContract } from "wagmi";
import {
  POOL_ADDRESSES_PROVIDER_ADDRESS,
  UI_POOL_ABI,
  UI_POOL_ADDRESS,
} from "@/constants/lending/ui-pool";
import { Token } from "@/types";
import { formatEther } from "viem";

function BorrowAssets() {
  const { onChange } = useDialog();

  const { data } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getReservesData",
    args: [POOL_ADDRESSES_PROVIDER_ADDRESS],
    query: {
      refetchInterval: 3000,
    },
  });

  const borrowAssets = data?.[0];

  const handleOpenBorrowAssetDialog = (props: BorrowDialogProps) => {
    onChange({
      open: true,
      title: `Borrow ${props.symbol}`,
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
          {borrowAssets?.map(
            ({ symbol, availableLiquidity, underlyingAsset }) => (
              <Row
                key={symbol}
                onClick={() =>
                  handleOpenBorrowAssetDialog({
                    symbol: symbol as Token,
                    address: underlyingAsset,
                  })
                }
                className="!grid-cols-4"
              >
                <div className={`${columnStyles} col-span-2`}>
                  <Asset symbol={symbol as Token} />
                </div>
                <div className={`${columnStyles} justify-end`}>
                  <p>{formatToDecimals(Math.random() * 8)}%</p>
                </div>
                <div className={`${columnStyles} justify-end`}>
                  <span>
                    {truncateCurrency(+formatEther(availableLiquidity))}
                  </span>
                </div>
              </Row>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default BorrowAssets;

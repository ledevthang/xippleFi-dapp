import { formatToDecimals, truncateCurrency } from "@/utils";
import { ASSETS_TO_BORROW_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import BorrowDialog, { BorrowDialogProps } from "../dialog/borrow-dialog";
import useDialog from "@/hooks/use-dialog";
import Asset from "@/components/common/asset";
import { useReadContract } from "wagmi";
import { UI_POOL_ABI, UI_POOL_ADDRESS } from "@/constants/lending/ui-pool";
import { Token } from "@/types";
import { formatEther } from "viem";
import { Skeleton } from "@/components/ui/skeleton";
import useAddressProvider from "@/hooks/useAddressProvider";

function BorrowAssets() {
  const { onChange } = useDialog();
  const ADDRESS_PROVIDER = useAddressProvider();

  const { data } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getReservesData",
    args: [ADDRESS_PROVIDER],
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
    <div className="flex !h-fit flex-1 flex-col">
      <div className="bg-color-secondary flex-1 rounded-sm p-4">
        <div className="mb-7 flex items-center gap-9">
          <h3 className="px-2 text-xl font-bold">Assets to borrow</h3>
        </div>
        <Header
          columns={ASSETS_TO_BORROW_HEADER}
          className="mb-6 !grid-cols-4"
        />
        <div className="flex flex-col gap-5">
          {borrowAssets?.length
            ? borrowAssets?.map(
                ({ symbol, availableLiquidity, underlyingAsset }) => (
                  <Row
                    key={symbol}
                    onClick={() =>
                      handleOpenBorrowAssetDialog({
                        symbol: symbol as Token,
                        address: underlyingAsset,
                        liquidity: availableLiquidity,
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
              )
            : Array.from({ length: 6 }).map((_, index) => (
                <Row key={index} className="!grid-cols-4">
                  <div className={`${columnStyles} col-span-2`}>
                    <Skeleton className="size-8 rounded-full bg-white" />
                    <Skeleton className="ml-2 h-4 w-[30px] bg-white" />
                  </div>
                  <div className={`${columnStyles} justify-end`}>
                    <Skeleton className="h-4 w-[50px] bg-white" />
                  </div>
                  <div className={`${columnStyles} justify-end`}>
                    <span>
                      <Skeleton className="h-4 w-[50px] bg-white" />
                    </span>
                  </div>
                </Row>
              ))}
        </div>
      </div>
    </div>
  );
}

export default BorrowAssets;

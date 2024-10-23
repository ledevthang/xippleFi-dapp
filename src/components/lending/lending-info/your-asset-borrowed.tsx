import { findKey, formatToDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "@/components/common/asset";
import useDialog from "@/hooks/use-dialog";
import RepayDialog, { RepayDialogProps } from "../dialog/repay-dialog";
import { useReadContract } from "wagmi";
import { UI_POOL_ABI, UI_POOL_ADDRESS } from "@/constants/lending/ui-pool";
import { Address, formatEther } from "viem";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import { Token } from "@/types";
import useAddressProvider from "@/hooks/useAddressProvider";
import { useMemo } from "react";
import YourAsset from "./your-asset";

interface YourAssetBorrowedProps {
  address: Address;
}

function YourAssetBorrowed({ address }: YourAssetBorrowedProps) {
  const columns = YOUR_ASSET_TABLE_HEADER["borrow"];
  const { onChange } = useDialog();

  const ADDRESS_PROVIDER = useAddressProvider();

  const handleOpenRepayDialog = (props: RepayDialogProps) => {
    onChange({
      open: true,
      title: `Repay ${props.symbol}`,
      content: <RepayDialog {...props} />,
    });
  };

  const { data: yourBorrows } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getUserReservesData",
    args: [ADDRESS_PROVIDER, address!],
  });

  const borrowd = useMemo(() => {
    return yourBorrows
      ?.flatMap((borrowed) => {
        if (typeof borrowed !== "number") {
          const borrowedAssets = borrowed.filter(
            ({ scaledVariableDebt }) => !!scaledVariableDebt,
          );
          return borrowedAssets;
        }
      })
      .filter((item) => item);
  }, [yourBorrows]);

  console.log("borrowd: ", borrowd);

  if (!borrowd?.length) {
    return <p className="pt-3 text-center">Nothing borrowed yet</p>;
  }

  return (
    <div className="mt-6">
      <YourAsset type={"borrow"} />
      <Header columns={columns} className="mt-5 !grid-cols-3" />
      <div className="mt-4 flex flex-col gap-3">
        {yourBorrows ? (
          yourBorrows?.flatMap((supplies) => {
            if (typeof supplies !== "number") {
              const suppliedBorrows = supplies.filter(
                ({ scaledVariableDebt }) => !!scaledVariableDebt,
              );

              if (suppliedBorrows.length)
                return suppliedBorrows.map(
                  ({ underlyingAsset, scaledVariableDebt }, index) => {
                    const symbol = findKey(TOKENS_ADDRESS, underlyingAsset);
                    const debt = formatEther(scaledVariableDebt);
                    return (
                      <Row
                        key={index}
                        onClick={() =>
                          handleOpenRepayDialog({
                            symbol: symbol as Token,
                            asset: underlyingAsset,
                            debt: debt,
                          })
                        }
                        className="!grid-cols-3"
                      >
                        <div className={`${columnStyles} col-span-1`}>
                          <Asset symbol={symbol as Token} />
                        </div>
                        <div className={`${columnStyles} justify-end`}>
                          <div className="flex flex-col items-end">
                            <p>{formatToDecimals(+debt)}</p>
                          </div>
                        </div>
                        <div className={`${columnStyles} justify-end`}>
                          <p>1.60%</p>
                        </div>
                      </Row>
                    );
                  },
                );
              else
                return <p className="pt-3 text-center">Nothing borrowed yet</p>;
            }
          })
        ) : (
          <p className="pt-3 text-center">Nothing borrowed yet</p>
        )}
      </div>
    </div>
  );
}

export default YourAssetBorrowed;

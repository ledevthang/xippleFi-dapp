import { findKey, formatToDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "@/components/common/asset";
import useDialog from "@/hooks/use-dialog";
import RepayDialog from "../dialog/repay-dialog";
import { useReadContract } from "wagmi";
import {
  POOL_ADDRESSES_PROVIDER_ADDRESS,
  UI_POOL_ABI,
  UI_POOL_ADDRESS,
} from "@/constants/lending/ui-pool";
import { Address, formatEther } from "viem";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import { Token } from "@/types";

interface YourAssetBorrowedProps {
  address: Address;
}

function YourAssetBorrowed({ address }: YourAssetBorrowedProps) {
  const columns = YOUR_ASSET_TABLE_HEADER["borrow"];
  const { onChange } = useDialog();

  const handleOpenRepayDialog = () => {
    onChange({
      open: true,
      title: "Repay POL",
      content: <RepayDialog />,
    });
  };

  const { data: yourBorrows } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getUserReservesData",
    args: [POOL_ADDRESSES_PROVIDER_ADDRESS, address!],
  });

  return (
    <div className="mt-6">
      <Header columns={columns} className="grid-cols-4" />
      <div className="flex flex-col gap-3">
        {yourBorrows ? (
          yourBorrows?.flatMap((supplies) => {
            if (typeof supplies !== "number") {
              const suppliedBorrows = supplies.filter(
                ({ scaledVariableDebt }) => !!scaledVariableDebt,
              );

              if (suppliedBorrows.length)
                return suppliedBorrows.map(
                  ({ underlyingAsset, scaledVariableDebt }) => {
                    const symbol = findKey(TOKENS_ADDRESS, underlyingAsset);
                    const balance = formatEther(scaledVariableDebt);
                    return (
                      <Row
                        key={underlyingAsset}
                        onClick={handleOpenRepayDialog}
                        className="grid-cols-4"
                      >
                        <div className={`${columnStyles} col-span-2`}>
                          <Asset symbol={symbol as Token} />
                        </div>
                        <div className={`${columnStyles} justify-end`}>
                          <div className="flex flex-col items-end">
                            <p>{formatToDecimals(+balance)}</p>
                            {/* <p className="text-xs">{formatCurrency(2.3)}</p> */}
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

import { Switch } from "@/components/ui/switch";
import { findKey, formatToDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "@/components/common/asset";
import WithdrawDialog from "../dialog/withdraw-dialog";
import useDialog from "@/hooks/use-dialog";
import { useReadContract } from "wagmi";
import {
  POOL_ADDRESSES_PROVIDER_ADDRESS,
  UI_POOL_ABI,
  UI_POOL_ADDRESS,
} from "@/constants/lending/ui-pool";
import { Address, formatEther } from "viem";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import { Token } from "@/types";
import CollateralStatusDialog, {
  CollateralStatusDialogProps,
} from "../dialog/collateral-status-dialog";

interface YourAssetDetailsProps {
  address: Address;
}

function YourAssetSupplied({ address }: YourAssetDetailsProps) {
  const columns = YOUR_ASSET_TABLE_HEADER["supply"];
  const { onChange } = useDialog();

  const { data: yourSupplies, refetch } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getUserReservesData",
    args: [POOL_ADDRESSES_PROVIDER_ADDRESS, address!],
    query: {
      refetchInterval: 3000,
    },
  });

  console.log("yourSupplies: ", yourSupplies);

  const handleOpenWithDrowDialog = (symbol: Token, supplied: string) => {
    onChange({
      open: true,
      title: "Withdraw USDT",
      content: (
        <WithdrawDialog symbol={symbol} supplied={supplied} refetch={refetch} />
      ),
    });
  };

  const handleOpenCollateralStatusDialog = ({
    status,
    symbol,
    amount,
    address,
  }: CollateralStatusDialogProps & { address: Address }) => {
    onChange({
      open: true,
      title: `Review tx ${symbol}`,
      content: (
        <CollateralStatusDialog
          status={status}
          symbol={symbol}
          amount={amount}
          address={address}
          refetch={refetch}
        />
      ),
    });
  };

  return (
    <div className="mt-6">
      <Header columns={columns} />
      <div className="flex flex-col gap-3">
        {yourSupplies ? (
          yourSupplies?.flatMap((supplies) => {
            if (typeof supplies !== "number") {
              const suppliedAssets = supplies.filter(
                ({ scaledATokenBalance }) => !!scaledATokenBalance,
              );

              if (suppliedAssets?.length)
                return suppliedAssets.map(
                  ({
                    underlyingAsset,
                    scaledATokenBalance,
                    usageAsCollateralEnabledOnUser,
                  }) => {
                    const symbol = findKey(TOKENS_ADDRESS, underlyingAsset);
                    const balance = formatEther(scaledATokenBalance);

                    return (
                      <Row
                        key={underlyingAsset}
                        onClick={() =>
                          handleOpenWithDrowDialog(symbol as Token, balance)
                        }
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
                        <div
                          className={`${columnStyles} justify-end`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCollateralStatusDialog({
                              symbol,
                              amount: balance,
                              address: underlyingAsset,
                              status: usageAsCollateralEnabledOnUser
                                ? "disable"
                                : "enable",
                            });
                          }}
                        >
                          <Switch checked={usageAsCollateralEnabledOnUser} />
                        </div>
                      </Row>
                    );
                  },
                );
              else
                return <p className="pt-3 text-center">Nothing supplied yet</p>;
            }
          })
        ) : (
          <p className="pt-3 text-center">Nothing supplied yet</p>
        )}
      </div>
    </div>
  );
}

export default YourAssetSupplied;

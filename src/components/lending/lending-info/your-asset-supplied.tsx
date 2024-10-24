import { Switch } from "@/components/ui/switch";
import { findKey, formatCurrency, formatToDecimals } from "@/utils";
import { columnStyles, YOUR_ASSET_TABLE_HEADER } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import Asset from "@/components/common/asset";
import WithdrawDialog from "../dialog/withdraw-dialog";
import useDialog from "@/hooks/use-dialog";
import { useReadContract } from "wagmi";
import { UI_POOL_ABI, UI_POOL_ADDRESS } from "@/constants/lending/ui-pool";
import { Address, formatEther } from "viem";
import { QUERY_KEY, Token } from "@/types";
import CollateralStatusDialog, {
  CollateralStatusDialogProps,
} from "../dialog/collateral-status-dialog";
import useAddressProvider from "@/hooks/useAddressProvider";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import YourAsset from "./your-asset";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSupplyAssetsService } from "@/services/lending.service";

interface YourAssetDetailsProps {
  address: Address;
}

function YourAssetSupplied({ address }: YourAssetDetailsProps) {
  const columns = YOUR_ASSET_TABLE_HEADER["supply"];
  const { onChange } = useDialog();
  const ADDRESS_PROVIDER = useAddressProvider();

  const { data: yourSupplies, refetch } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getUserReservesData",
    args: [ADDRESS_PROVIDER, address!],
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: assetsData } = useQuery({
    queryKey: [QUERY_KEY.SUPPLY_ASSETS],
    queryFn: getSupplyAssetsService,
  });

  const findPriceBySymbol = (_symbol: string) => {
    const asset = assetsData?.assets.find(({ symbol }) => symbol === _symbol);
    const price = formatEther(BigInt(asset?.realTimePrice || 0));
    return price;
  };

  const handleOpenWithDrowDialog = (
    symbol: Token,
    supplied: string,
    asset: Address,
  ) => {
    onChange({
      open: true,
      title: "Withdraw USDT",
      content: (
        <WithdrawDialog symbol={symbol} supplied={supplied} asset={asset} />
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

  const supplied = useMemo(() => {
    return yourSupplies
      ?.flatMap((supplies) => {
        if (typeof supplies !== "number") {
          const suppliedAssets = supplies.filter(
            ({ scaledATokenBalance }) => !!scaledATokenBalance,
          );
          return suppliedAssets;
        }
      })
      .filter((item) => item);
  }, [yourSupplies]);

  const totalBalance = useMemo(() => {
    return supplied?.reduce((t, item) => {
      const symbol = findKey(TOKENS_ADDRESS, item!.underlyingAsset);
      const balance = formatEther(item!.scaledATokenBalance);
      const price = findPriceBySymbol(symbol === "WXRP" ? "XRP" : symbol!);
      const totalPrice = +price * +balance;

      return (t += totalPrice);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplied]);

  if (!supplied?.length)
    return <p className="pt-3 text-center">Nothing supplied yet</p>;

  return (
    <div className="mt-6">
      <YourAsset type="supply" balance={totalBalance} />
      <Header columns={columns} className="mt-5" />
      <div className="mt-4 flex flex-col gap-3">
        {supplied &&
          supplied?.map((item, index) => {
            const symbol = findKey(TOKENS_ADDRESS, item!.underlyingAsset);
            const balance = formatEther(item!.scaledATokenBalance);
            const price = findPriceBySymbol(
              symbol === "WXRP" ? "XRP" : symbol!,
            );
            const totalPrice = +price * +balance;
            return (
              <Row
                key={index}
                onClick={() =>
                  handleOpenWithDrowDialog(
                    symbol as Token,
                    balance,
                    item!.underlyingAsset,
                  )
                }
              >
                <div className={`${columnStyles} col-span-2`}>
                  <Asset symbol={symbol as Token} />
                </div>
                <div className={`${columnStyles} justify-end`}>
                  <div className="flex flex-col items-end">
                    <p>{formatToDecimals(+balance)}</p>
                    <p className="text-xs">{formatCurrency(totalPrice)}</p>
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
                      symbol: symbol as Token,
                      amount: balance,
                      address: item!.underlyingAsset,
                      status: item!.usageAsCollateralEnabledOnUser
                        ? "disable"
                        : "enable",
                    });
                  }}
                >
                  <Switch checked={item!.usageAsCollateralEnabledOnUser} />
                </div>
              </Row>
            );
          })}
      </div>
    </div>
  );
}

export default YourAssetSupplied;

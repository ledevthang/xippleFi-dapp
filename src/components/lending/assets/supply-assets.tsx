import { formatToDecimals, getBalanceByToken, truncateCurrency } from "@/utils";
import Asset from "@/components/common/asset";
import { ASSETS_TO_SUPPLY_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import SupplyDialog, { SupplyDialogProps } from "../dialog/supply-dialog";
import useDialog from "@/hooks/use-dialog";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Decimal } from "decimal.js";
import { UI_POOL_ABI, UI_POOL_ADDRESS } from "@/constants/lending/ui-pool";
import useAddressProvider from "@/hooks/useAddressProvider";

function SupplyAssets() {
  const { context, onChange } = useDialog();
  const { address: myAddress } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mappedBalanceData, setMappedBalanceData] = useState<any[]>();
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

  // const { data: nativeBanlance } = useBalance({
  //   address: myAddress,
  // });

  const supplyAssets = data?.[0];

  // const nativeAsset = useMemo(() => {
  //   return mappedBalanceData?.find(({ symbol }) => {
  //     return symbol === "WXRP";
  //   });
  // }, [mappedBalanceData]);

  const handleOpenSupplyAssetDialog = (props: SupplyDialogProps) => {
    const balance: unknown = new Decimal(props.balance).toFixed(0);
    if (Number(balance))
      onChange({
        open: true,
        title: `Supply ${props.symbol}`,
        content: <SupplyDialog {...props} />,
      });
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (supplyAssets) {
        const results = await Promise.all(
          supplyAssets?.map(async ({ underlyingAsset, ...rest }) => {
            let balance = 0;
            try {
              if (myAddress)
                balance = await getBalanceByToken(myAddress, underlyingAsset);
              return {
                ...rest,
                balance: Number(balance),
              };
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_e: unknown) {
              return {
                ...rest,
                balance,
              };
            }
          }),
        );
        setMappedBalanceData(results);
      }
    };
    fetchBalances();
  }, [myAddress, context.open, supplyAssets]);

  return (
    <div className="flex !h-fit flex-1 flex-col">
      <div className="bg-color-primary flex-1 rounded-sm p-4">
        <div className="mb-7 flex h-full items-center gap-9">
          <h3 className="px-2 text-xl font-bold">Assets to supply</h3>
        </div>
        <Header
          columns={ASSETS_TO_SUPPLY_HEADER}
          className="mb-6 !grid-cols-4"
        />
        <div className="flex flex-col gap-5">
          {/* <Row
            className="!grid-cols-4"
            onClick={() =>
              handleOpenSupplyAssetDialog({
                symbol: "XRP",
                balance: Number(nativeBanlance?.formatted) || 0,
                apy: 1,
                baseLTVasCollateral: nativeAsset.baseLTVasCollateral,
              })
            }
          >
            <div className={`${columnStyles} col-span-2`}>
              <Asset symbol="XRP" />
            </div>
            <div className={`${columnStyles} justify-end`}>
              <p>{formatToDecimals(Math.random() * 8)}%</p>
            </div>
            <div className={`${columnStyles} justify-end`}>
              <span>
                {truncateCurrency(Number(nativeBanlance?.formatted) || 0)}
              </span>
            </div>
          </Row> */}
          {!mappedBalanceData?.length
            ? Array.from({ length: 6 }).map((_, index) => (
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
              ))
            : mappedBalanceData.map(
                ({ symbol, balance, baseLTVasCollateral }, index) => {
                  return (
                    <Row
                      onClick={() =>
                        handleOpenSupplyAssetDialog({
                          symbol: symbol,
                          balance: balance || 0,
                          apy: 1,
                          baseLTVasCollateral: baseLTVasCollateral,
                        })
                      }
                      key={index}
                      className="!grid-cols-4"
                    >
                      <div className={`${columnStyles} col-span-2`}>
                        <Asset symbol={symbol} />
                      </div>
                      <div className={`${columnStyles} justify-end`}>
                        <p>{formatToDecimals(Math.random() * 8)}%</p>
                      </div>
                      <div className={`${columnStyles} justify-end`}>
                        <span>{truncateCurrency(+balance! || 0)}</span>
                      </div>
                    </Row>
                  );
                },
              )}
        </div>
      </div>
    </div>
  );
}

export default SupplyAssets;

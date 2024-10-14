import { formatToTwoDecimals, getBalanceByToken } from "@/utils";
import Asset from "../common/asset";
import { ASSETS_TO_SUPPLY_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import { SupplyAsset } from "@/types/lending";
import SupplyDialog, { SupplyDialogProps } from "../dialog/supply-dialog";
import useDialog from "@/hooks/use-dialog";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SupplyAssetsProps {
  data: SupplyAsset[];
  isLoading: boolean;
}

function SupplyAssets({ data, isLoading }: SupplyAssetsProps) {
  const { onChange } = useDialog();
  const { address: myAddress } = useAccount();
  const [mappedBalanceData, setMappedBalanceData] = useState<SupplyAsset[]>([]);
  const [loading, setLoading] = useState(isLoading);

  const handleOpenSupplyAssetDialog = (props: SupplyDialogProps) => {
    onChange({
      open: true,
      title: `Supply ${props.symbol}`,
      content: <SupplyDialog {...props} />,
    });
  };

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      const results = await Promise.all(
        data.map(async ({ address, ...rest }) => {
          let balance = 0;
          try {
            if (myAddress)
              balance = await getBalanceByToken(myAddress, address);
            return {
              ...rest,
              balance,
              address,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_e: unknown) {
            return {
              ...rest,
              balance,
              address,
            };
          }
        }),
      );
      setMappedBalanceData(results);
      setLoading(false);
    };
    fetchBalances();
  }, [data, myAddress]);

  return (
    <div className="mt-10 flex !h-fit flex-1 flex-col">
      <div className="mb-7 flex h-full items-center gap-9">
        <div className="h-[28px] w-[2px] bg-[#69e2db]"></div>
        <h3 className={`text-xl font-bold`}>Assets to supply</h3>
      </div>

      <div className="bg-color-primary flex-1 rounded-sm p-4">
        <Header columns={ASSETS_TO_SUPPLY_HEADER} className="!grid-cols-4" />
        <div className="flex flex-col gap-5">
          {!mappedBalanceData.length || loading
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
            : mappedBalanceData.map(({ id, symbol, apy, balance }) => (
                <Row
                  onClick={() =>
                    handleOpenSupplyAssetDialog({
                      symbol,
                      balance: balance || 0,
                      apy,
                    })
                  }
                  key={id}
                  className="!grid-cols-4"
                >
                  <div className={`${columnStyles} col-span-2`}>
                    <Asset symbol={symbol} />
                  </div>
                  <div className={`${columnStyles} justify-end`}>
                    <p>{formatToTwoDecimals(apy)}%</p>
                  </div>
                  <div className={`${columnStyles} justify-end`}>
                    <span>
                      {formatToTwoDecimals(balance)} {symbol}
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

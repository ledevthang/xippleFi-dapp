import StakingCard from "@/components/stake/staking-card";
import { UI_POOL_ABI, UI_POOL_ADDRESS } from "@/constants/lending/ui-pool";
import useAddressProvider from "@/hooks/useAddressProvider";
import { getBalanceByToken } from "@/utils";
import { useEffect, useState } from "react";
import { Address, formatEther } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

function StakePage() {
  const ADDRESS_PROVIDER = useAddressProvider();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mappedBalanceData, setMappedBalanceData] = useState<any[]>();
  console.log("mappedBalanceData: ", mappedBalanceData);

  const { address } = useAccount();

  const { data: nativeBanlance } = useBalance({
    address: address,
  });

  const { data } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getReservesData",
    args: [ADDRESS_PROVIDER],
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: yourSupplies } = useReadContract({
    address: UI_POOL_ADDRESS,
    abi: UI_POOL_ABI,
    functionName: "getUserReservesData",
    args: [ADDRESS_PROVIDER, address!],
    query: {
      refetchInterval: 3000,
    },
  });

  const supplyAssets = data?.[0];
  const supplied = yourSupplies?.[0];

  const findSupplied = (asset: Address) => {
    return supplied?.find(
      ({ underlyingAsset }) =>
        underlyingAsset?.toLowerCase() === asset?.toLowerCase(),
    );
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (supplyAssets) {
        const results = await Promise.all(
          supplyAssets?.map(async ({ underlyingAsset, ...rest }) => {
            let balance = 0;
            try {
              if (address)
                balance = await getBalanceByToken(address, underlyingAsset);
              return {
                ...rest,
                underlyingAsset,
                balance: Number(balance),
              };
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_e: unknown) {
              return {
                ...rest,
                underlyingAsset,
                balance,
              };
            }
          }),
        );
        setMappedBalanceData(results);
      }
    };
    fetchBalances();
  }, [address, supplyAssets]);

  return (
    <div className="bg-blur-staking flex-1">
      <div className="container mx-auto px-3 pb-20">
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {mappedBalanceData?.map(
            ({
              symbol,
              balance,
              availableLiquidity,
              priceInMarketReferenceCurrency,
              underlyingAsset,
            }) => {
              const supplied = findSupplied(underlyingAsset);

              if (symbol === "WXRP") {
                return (
                  <>
                    <StakingCard
                      key="XRP"
                      symbol="XRP"
                      balance={nativeBanlance?.formatted}
                      liquidity={availableLiquidity}
                      priceInMarketReferenceCurrency={
                        priceInMarketReferenceCurrency
                      }
                      supplied={formatEther(supplied!.scaledATokenBalance)}
                      asset={underlyingAsset}
                    />
                    <StakingCard
                      key={symbol}
                      symbol={symbol}
                      balance={balance}
                      liquidity={availableLiquidity}
                      priceInMarketReferenceCurrency={
                        priceInMarketReferenceCurrency
                      }
                      supplied={formatEther(supplied!.scaledATokenBalance)}
                      asset={underlyingAsset}
                    />
                  </>
                );
              } else {
                return (
                  <StakingCard
                    key={symbol}
                    symbol={symbol}
                    balance={balance}
                    liquidity={availableLiquidity}
                    priceInMarketReferenceCurrency={
                      priceInMarketReferenceCurrency
                    }
                    supplied={formatEther(supplied!.scaledATokenBalance)}
                    asset={underlyingAsset}
                  />
                );
              }
            },
          )}
        </div>
      </div>
    </div>
  );
}

export default StakePage;

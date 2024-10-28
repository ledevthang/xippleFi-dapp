import { Token } from "@/types";
import Asset from "../common/asset";
import { Button } from "@/components/ui/button";
import { formatToDecimals, truncateCurrency } from "@/utils";
import { Address, formatEther } from "viem";
import SupplyDialog from "../lending/dialog/supply-dialog";
import useDialog from "@/hooks/use-dialog";
import WithdrawDialog from "../lending/dialog/withdraw-dialog";

interface StakingCardProps {
  symbol: Token;
  balance?: string;
  liquidity: bigint;
  priceInMarketReferenceCurrency: bigint;
  supplied: string;
  asset: Address;
}

function StakingCard({
  symbol,
  balance = "0",
  liquidity,
  priceInMarketReferenceCurrency,
  supplied,
  asset,
}: StakingCardProps) {
  const { onChange } = useDialog();

  const staked = +formatEther(liquidity);
  const price = +formatEther(priceInMarketReferenceCurrency);
  const totalPrice = staked * price;

  const handleOpenSupplyAssetDialog = () => {
    if (Number(balance))
      onChange({
        open: true,
        title: `Supply ${symbol}`,
        content: (
          <SupplyDialog
            symbol={symbol}
            apy={1}
            balance={+balance}
            baseLTVasCollateral={7000}
          />
        ),
      });
  };

  const handleOpenWithDrowDialog = () => {
    onChange({
      open: true,
      title: `Withdraw ${symbol}`,
      content: (
        <WithdrawDialog symbol={symbol} supplied={supplied} asset={asset} />
      ),
    });
  };

  return (
    <div className="bg-staking-card rounded p-4">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Stake {symbol}</h2>
        <h5 className="text-balance">
          Total staked: {truncateCurrency(staked)} ($
          {truncateCurrency(totalPrice, 2)})
        </h5>
        <h5 className="text-balance">
          Your supplied: {truncateCurrency(+supplied)} ($
          {truncateCurrency(+supplied * price, 2)})
        </h5>
      </div>

      <div className="grid grid-cols-2 gap-6 rounded border border-[#ebebef14] p-4">
        <Asset symbol={symbol} className="font-semibold" />
        <div>
          <h3 className="text-sm font-semibold">Staking APR</h3>
          <p>4.35%</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">APY</h3>
          <p>30.00%</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Balance</h3>
          <p>
            {formatToDecimals(+balance, 3)} {symbol}
          </p>
        </div>
        <div className="col-span-2 mt-3 text-center">
          <div className="flex gap-5">
            <Button
              variant="secondary"
              className="w-full font-bold"
              onClick={handleOpenSupplyAssetDialog}
            >
              Stake
            </Button>

            <Button
              variant="destructive"
              className="w-full font-bold"
              disabled={!supplied}
              onClick={handleOpenWithDrowDialog}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingCard;

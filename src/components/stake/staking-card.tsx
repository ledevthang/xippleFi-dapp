import Asset from "../common/asset";
import { Button } from "@/components/ui/button";

function StakingCard() {
  return (
    <div className="bg-staking-card rounded p-4">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Stake AAVE</h2>
        <h5 className="text-balance">Total staked: 3.02M ($492.42M)</h5>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded border border-[#ebebef14] p-4 xl:grid-cols-5">
        <Asset symbol="BNB" className="font-semibold" />
        <div>
          <h3 className="text-sm font-semibold">Staking APR</h3>
          <p>4.35%</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Max slashing</h3>
          <p>30.00%</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Balance</h3>
          <p>0</p>
        </div>
        <div className="col-span-2 text-center xl:col-span-1">
          <Button variant="secondary" className="w-full font-bold">
            Stake
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded border border-[#ebebef14] p-4 text-center">
          <p className="text-sm">Staked AAVE</p>
          <p className="my-2 text-lg font-semibold">0</p>
          <p className="text-sm">$0</p>
          <Button className="mt-5 w-full" disabled>
            Cooldown to unstake
          </Button>
          <div className="mt-4 flex items-center justify-between text-xs">
            <p>Cooldown period</p>
            <p className="font-semibold">20d</p>
          </div>
        </div>

        <div className="rounded border border-[#ebebef14] p-4 text-center">
          <p className="text-sm">Staked AAVE</p>
          <p className="my-2 text-lg font-semibold">0</p>
          <p className="text-sm">$0</p>

          <div className="flex items-center gap-2">
            <Button className="mt-5 w-full">Claim</Button>
            <Button className="mt-5 w-full">Restake</Button>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <p>Aave per month</p>
            <p className="font-semibold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingCard;

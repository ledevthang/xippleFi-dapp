import StakingCard from "@/components/stake/staking-card";

function StakePage() {
  return (
    <div className="bg-blur-staking flex-1">
      <div className="container mx-auto px-3 pb-20">
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StakingCard symbol="XRP" />
          <StakingCard symbol="USDT" />
          <StakingCard symbol="BNB" />
          <StakingCard symbol="ETH" />
        </div>
      </div>
    </div>
  );
}

export default StakePage;

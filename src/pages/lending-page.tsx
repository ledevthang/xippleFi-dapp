import YourBalance from "@/components/lending/lending-info/your-balance";
import SupplyAssets from "@/components/lending/assets/supply-assets";
import BorrowAssets from "@/components/lending/assets/borrow-assets";
import { MOCK_BORROW_ASSETS, MOCK_SUPPLY_ASSETS } from "@/constants/mock";

function LendingPage() {
  return (
    <div className="flex-1 bg-[url('/images/navbar-bg.svg')] bg-contain bg-no-repeat">
      <div className="container mx-auto my-4 flex flex-1">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-1 justify-between gap-10">
            <YourBalance type="supply" />
            <YourBalance type="borrow" />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <SupplyAssets data={MOCK_SUPPLY_ASSETS} />
            <BorrowAssets data={MOCK_BORROW_ASSETS} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;

import YourBalance from "@/components/lending/lending-info/your-balance";
import SupplyAssets from "@/components/lending/assets/supply-assets";
import Assets from "@/components/lending/assets";
import BorrowAssets from "@/components/lending/assets/borrow-assets";
import { MOCK_BORROW_ASSETS, MOCK_SUPPLY_ASSETS } from "@/constants/mock";

function LendingPage() {
  return (
    <div className="flex-1 bg-[url('/images/navbar-bg.svg')] bg-cover bg-no-repeat">
      <div className="container mx-auto my-4 flex flex-1">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-1 justify-between gap-10">
            <YourBalance type="supply" />
            <YourBalance type="borrow" />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <Assets label="Assets to supply" color="#69e2db" key="supply">
              <SupplyAssets data={MOCK_SUPPLY_ASSETS} />
            </Assets>
            <Assets label="Assets to borrow" color="#cdc5ff" key="borrow">
              <BorrowAssets data={MOCK_BORROW_ASSETS} />
            </Assets>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;

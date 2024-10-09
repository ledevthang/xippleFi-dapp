import YourBalance from "@/components/lending/lending-info/your-balance";
import SupplyAssets from "@/components/lending/supply-assets";
import BorrowAssets from "@/components/lending/borrow-assets";

function LendingPage() {
  return (
    <div className="flex-1 bg-[url('/images/navbar-bg.svg')] bg-cover bg-no-repeat">
      <div className="container mx-auto my-4 flex flex-1">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-1 justify-between gap-10">
            <YourBalance type="supply" />
            <YourBalance type="borrow" />
          </div>

          <div className="flex flex-1 justify-between gap-10">
            <SupplyAssets />
            <BorrowAssets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;

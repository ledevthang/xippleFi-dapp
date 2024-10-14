import YourBalance from "@/components/lending/lending-info/your-balance";
import SupplyAssets from "@/components/lending/assets/supply-assets";
import BorrowAssets from "@/components/lending/assets/borrow-assets";
import { MOCK_BORROW_ASSETS } from "@/constants/mock";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types";
import { getSupplyAssetsService } from "@/services/lending.service";
import { Context } from "@/providers/app-context";
import { useContext } from "react";

function LendingPage() {
  const { isLogin } = useContext(Context);

  const { data: supplyAssets, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SUPPLY_ASSETS],
    queryFn: getSupplyAssetsService,
  });

  return (
    <div className="flex-1 bg-[url('/images/navbar-bg.svg')] bg-contain bg-no-repeat">
      <div className="container mx-auto my-4 flex flex-1 px-3">
        <div className="flex flex-1 flex-col gap-8">
          {isLogin && (
            <div className="grid grid-cols-1 gap-10 transition delay-150 ease-in-out lg:grid-cols-2">
              <YourBalance type="supply" />
              <YourBalance type="borrow" />
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <SupplyAssets
              data={supplyAssets?.assets || []}
              isLoading={isLoading}
            />
            <BorrowAssets data={MOCK_BORROW_ASSETS as never} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;

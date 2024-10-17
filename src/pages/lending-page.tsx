import YourBalance from "@/components/lending/lending-info/your-balance";
import SupplyAssets from "@/components/lending/assets/supply-assets";
import BorrowAssets from "@/components/lending/assets/borrow-assets";
import { MOCK_BORROW_ASSETS } from "@/constants/mock";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types";
import { getSupplyAssetsService } from "@/services/lending.service";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "wagmi";

function LendingPage() {
  const { isConnected } = useAccount();

  const { data: supplyAssets, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SUPPLY_ASSETS],
    queryFn: getSupplyAssetsService,
  });

  return (
    <div className="bg-image flex flex-1 pb-5 sm:items-center">
      <div className="container mx-auto my-4 flex flex-1 px-3">
        <div className="hidden flex-1 flex-col gap-8 sm:flex">
          {isConnected && (
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

        <Tabs defaultValue="supplies" className="w-full sm:hidden">
          <TabsList className="bg-dialog grid grid-cols-2">
            <TabsTrigger
              value="supplies"
              className="bg-color-primary tabs-trigger"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="borrows"
              className="bg-color-secondary tabs-trigger"
            >
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="supplies">
            <div className="grid grid-cols-1 gap-10 transition delay-150 ease-in-out lg:grid-cols-2">
              {isConnected && <YourBalance type="supply" />}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <SupplyAssets
                data={supplyAssets?.assets || []}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
          <TabsContent value="borrows">
            <div className="grid grid-cols-1 gap-10 transition delay-150 ease-in-out lg:grid-cols-2">
              {isConnected && <YourBalance type="borrow" />}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <BorrowAssets data={MOCK_BORROW_ASSETS as never} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LendingPage;

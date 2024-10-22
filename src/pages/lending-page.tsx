import SupplyAssets from "@/components/lending/assets/supply-assets";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types";
import { getSupplyAssetsService } from "@/services/lending.service";
import { useAccount } from "wagmi";
import YourAsset from "@/components/lending/lending-info/your-asset";
import YourAssetSupplied from "@/components/lending/lending-info/your-asset-supplied";
import YourAssetBorrowed from "@/components/lending/lending-info/your-asset-borrowed";
import BorrowAssets from "@/components/lending/assets/borrow-assets";

function LendingPage() {
  const { isConnected, address } = useAccount();

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
              <div className={`bg-color-primary rounded-sm p-4`}>
                <div>
                  <h3 className="mb-8 text-lg font-bold">Your supplies</h3>
                  <YourAsset type={"supply"} />
                  <YourAssetSupplied address={address!} />
                </div>
              </div>
              <div className={`bg-color-secondary rounded-sm p-4`}>
                <div>
                  <h3 className="mb-8 text-lg font-bold">Your borrows</h3>
                  <YourAsset type={"borrow"} />
                  <YourAssetBorrowed address={address!} />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <SupplyAssets
              data={supplyAssets?.assets || []}
              isLoading={isLoading}
            />
            <BorrowAssets />
          </div>
        </div>

        {/* <Tabs defaultValue="supplies" className="w-full sm:hidden">
          <TabsList className="bg-dialog grid grid-cols-2">
            <TabsTrigger
              value="supplies"
              className="bg-color-primary tabs-trigger"
            >
              Your supplies
            </TabsTrigger>
            <TabsTrigger
              value="borrows"
              className="bg-color-secondary tabs-trigger"
            >
              Your borrows
            </TabsTrigger>
          </TabsList>
          <TabsContent value="supplies">
            <div className="grid grid-cols-1 gap-10 transition delay-150 ease-in-out lg:grid-cols-2">
              {isConnected && (
                <div className={`bg-color-primary rounded-sm p-4`}>
                  <div>
                    <h3 className="mb-8 text-lg font-bold">Your supplies</h3>
                    <YourAsset type={"supply"} />
                    <YourAssetSupplied type={"supply"} address={address!} />
                  </div>
                </div>
              )}
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
              {isConnected && (
                <div className={`bg-color-primary rounded-sm p-4`}>
                  <div>
                    <h3 className="mb-8 text-lg font-bold">Your borrows</h3>
                    <YourAsset type={"supply"} />
                    <YourAssetBorrowed address={address!} />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <BorrowAssets data={MOCK_BORROW_ASSETS as never} />
            </div>
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  );
}

export default LendingPage;

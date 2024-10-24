import SupplyAssets from "@/components/lending/assets/supply-assets";
import { useAccount } from "wagmi";
import YourAssetSupplied from "@/components/lending/lending-info/your-asset-supplied";
import YourAssetBorrowed from "@/components/lending/lending-info/your-asset-borrowed";
import BorrowAssets from "@/components/lending/assets/borrow-assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LendingPage() {
  const { isConnected, address } = useAccount();
  return (
    <div className="bg-image flex flex-1 pb-5">
      <div className="container mx-auto my-4 flex flex-1 px-3">
        <div className="hidden flex-1 flex-col gap-8 sm:flex">
          <div className="grid grid-cols-2 gap-4 transition delay-150 ease-in-out lg:grid-cols-2">
            <div>
              {isConnected && (
                <div className="bg-color-primary mb-5 rounded-sm p-4">
                  <div>
                    <h3 className="mb-0 text-lg font-bold">Your supplies</h3>
                    <YourAssetSupplied address={address!} />
                  </div>
                </div>
              )}
              <SupplyAssets />
            </div>
            <div>
              {isConnected && (
                <div className="bg-color-secondary mb-5 h-fit rounded-sm p-4">
                  <div>
                    <h3 className="text-lg font-bold">Your borrows</h3>
                    <YourAssetBorrowed address={address!} />
                  </div>
                </div>
              )}
              <BorrowAssets />
            </div>
          </div>
        </div>

        <Tabs defaultValue="supplies" className="w-full sm:hidden">
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
                <div className="bg-color-primary rounded-sm p-4">
                  <div>
                    <h3 className="text-lg font-bold">Your supplies</h3>
                    <YourAssetSupplied address={address!} />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <SupplyAssets />
            </div>
          </TabsContent>
          <TabsContent value="borrows">
            <div className="grid grid-cols-1 gap-10 transition delay-150 ease-in-out lg:grid-cols-2">
              {isConnected && (
                <div className="bg-color-primary rounded-sm p-4">
                  <div>
                    <h3 className="text-lg font-bold">Your borrows</h3>
                    <YourAssetBorrowed address={address!} />
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <BorrowAssets />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LendingPage;

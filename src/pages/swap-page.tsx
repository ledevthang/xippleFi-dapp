import SelectToken from "@/components/swap/select-token";
import { Button } from "@/components/ui/button";

function SwapPage() {
  return (
    <div className="bg-swap flex-1 pb-10">
      <div className="container mx-auto flex h-full w-full">
        <div className="m-auto w-[370px] bg-[#252B36] p-4 sm:w-[472px]">
          <div>
            <h3 className="text-2xl">Swap</h3>
            <div className="relative flex flex-col gap-4">
              <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
                <img src="/icons/arrow.svg" alt="" />
              </div>

              <div className="rounded-[12px] bg-[#2B3342] px-3 py-4">
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="bg-transparent text-base font-semibold outline-none"
                    placeholder="0.00"
                  />
                  <SelectToken />
                </div>

                <div className="!m-0 flex justify-between pt-3 text-sm">
                  <span>$0</span>
                  <div>
                    <span>Balance: 3.29 BNB</span>
                    <span className="ml-2 cursor-pointer font-semibold hover:opacity-90">
                      MAX
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] bg-[#2B3342] px-3 py-4">
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="bg-transparent text-base font-semibold outline-none"
                    placeholder="0.00"
                  />
                  <SelectToken />
                </div>

                <div className="!m-0 flex justify-between pt-3 text-sm">
                  <span>$0</span>
                  <div>
                    <span>Balance: 3.29 BNB</span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full font-semibold" variant="secondary">
              Swap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPage;

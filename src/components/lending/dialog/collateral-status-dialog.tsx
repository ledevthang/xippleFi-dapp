import { Button } from "@/components/ui/button";
import { POOL_ABI, POOL_ADDRESS } from "@/constants/lending";
import useDialog from "@/hooks/use-dialog";
import { useToast } from "@/hooks/use-toast";
import useTransactions from "@/hooks/use-transactions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Address } from "viem";

export interface CollateralStatusDialogProps {
  status: "enable" | "disable";
  symbol: string;
  amount: string;
  address: Address;
  refetch?: () => void;
}

function CollateralStatusDialog({
  status,
  amount,
  symbol,
  address,
  refetch,
}: CollateralStatusDialogProps) {
  const { onClose } = useDialog();
  const { toast } = useToast();
  const { isLoading, isSuccess, writeContract } = useTransactions();

  const onUpdateCollateralStatus = () => {
    writeContract({
      address: POOL_ADDRESS,
      abi: POOL_ABI,
      functionName: "setUserUseReserveAsCollateral",
      args: [address, status === "enable" ? true : false],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Succeed",
        description: `Your ${symbol} is ${status === "enable" ? "" : "not"} used as collateral`,
      });
      refetch?.();
      onClose();
    }
  }, [isSuccess, onClose, refetch, status, symbol, toast]);

  if (status === "enable")
    return (
      <div>
        <div>
          <p className="rounded bg-[#2f1e03] p-2 text-sm">
            Enabling this asset as collateral increases your borrowing power and
            Health Factor. However, it can get liquidated if your health factor
            drops below 1.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-sm border border-[#ebebef14] px-2 py-4">
          <p>Supply balance</p>
          <p>
            {amount} {symbol}
          </p>
        </div>
        {isLoading ? (
          <Button disabled className="mt-4 w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mt-4 w-full" onClick={onUpdateCollateralStatus}>
            Enable {symbol} as collateral
          </Button>
        )}
      </div>
    );
  else
    return (
      <div>
        <div>
          <p className="rounded bg-[#2f1e03] p-2 text-sm">
            Disabling this asset as collateral affects your borrowing power and
            Health Factor.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-sm border border-[#ebebef14] px-2 py-4">
          <p>Supply balance</p>
          <p>
            {amount} {symbol}
          </p>
        </div>
        {isLoading ? (
          <Button disabled className="mt-4 w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mt-4 w-full" onClick={onUpdateCollateralStatus}>
            Disable {symbol} as collateral
          </Button>
        )}
      </div>
    );
}

export default CollateralStatusDialog;

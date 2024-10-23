import { useEffect, useState } from "react";
import Amount from "./amount";
import { Address, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { Token } from "@/types";
import useTransactions from "@/hooks/use-transactions";
import { POOL_ABI, POOL_ADDRESS } from "@/constants/lending";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";

export interface RepayDialogProps {
  symbol: Token;
  asset: Address;
  debt: string;
}

export default function RepayDialog({ symbol, asset, debt }: RepayDialogProps) {
  const [amount, setAmount] = useState<string>();

  const { onChange, onClose } = useDialog();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: asset,
  });

  const { writeContract, isLoading, isSuccess, receipt } = useTransactions();

  const handleRepayAsset = () => {
    if (amount)
      writeContract({
        address: POOL_ADDRESS,
        abi: POOL_ABI,
        functionName: "repay",
        args: [asset, parseEther(amount), BigInt(2), address!],
      });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value || undefined);
  };

  const onSetMaxValue = () => {
    setAmount(debt);
  };

  useEffect(() => {
    if (isSuccess) {
      onChange({
        open: true,
        title: "Succeed",
        content: (
          <SuccessDialog
            label={`You Borrowed ${amount} ${symbol}`}
            txHash={receipt?.transactionHash}
          />
        ),
        footer: "Ok, close",
        onSubmit: onClose,
      });
    }
  }, [amount, isSuccess, onChange, onClose, receipt?.transactionHash, symbol]);

  return (
    <>
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Repay amount</h4>
        <Amount
          symbol={symbol}
          label="Wallet balance"
          amount={Number(amount)}
          onChange={onChangeAmount}
          balance={Number(balance?.formatted) || 0}
          onSetMaxValue={onSetMaxValue}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Borrow stats</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Borrow APY</span>
            <span>8.15%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Borrow Balance</span>
            <span>0.000010 DAI</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Borrow limit</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Your Borrow Limit</span>
            <span>{`$0.11`}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Borrow Limit Used</span>
            <span>{`0.01% -> 0.01%`}</span>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6 flex-1 !justify-center">
        {isLoading ? (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={!amount}
            onClick={handleRepayAsset}
          >
            {amount ? `Borrow ${symbol}` : "Enter an amount"}
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

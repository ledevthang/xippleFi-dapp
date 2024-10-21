import { useEffect, useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import useTokenInfo from "@/hooks/useTokenInfo";
import useTransactions from "@/hooks/use-transactions";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import { ADDRESS, POOL_ABI } from "@/constants/lending";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";

export interface WithdrawDialogProps {
  symbol: Token;
}

export default function WithdrawDialog({ symbol }: WithdrawDialogProps) {
  const [amount, setAmount] = useState<number>();
  const { data } = useTokenInfo(symbol);
  const { address } = useAccount();
  const { onChange, onClose } = useDialog();

  const {
    receipt,
    writeContract,
    isLoading: isLoadingTransaction,
    isSuccess,
  } = useTransactions();

  const handleWithdraw = () => {
    if (address)
      writeContract({
        address: ADDRESS,
        abi: POOL_ABI,
        functionName: "widthdraw",
        args: [TOKENS_ADDRESS[symbol], parseEther(`${amount}`), address],
      });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e?.target?.value || undefined);
  };

  useEffect(() => {
    if (amount && isSuccess) {
      onChange({
        open: true,
        title: `Withdrew`,
        content: (
          <SuccessDialog
            label={` You Withdrew ${amount} ${symbol}`}
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
        <h4 className="text-sm font-semibold">Withdraw amount</h4>
        <Amount
          symbol={symbol}
          label="Supply balance"
          amount={amount}
          onChange={onChangeAmount}
          realTimePrice={data?.asset?.realTimePrice}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Supply stats</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Supply APY</span>
            <span>1.48%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Remaining supply</span>
            <span>4.00 POL</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Borrow limit</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Your Borrow Limit</span>
            <span>{`$0.11 -> $0.11`}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Borrow Limit Used</span>
            <span>{`0.01% -> 0.01%`}</span>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6 flex-1 !justify-center">
        {!isLoadingTransaction ? (
          <Button
            className="w-full"
            disabled={!amount}
            onClick={handleWithdraw}
          >
            {amount ? `Withdraw ${symbol}` : "Enter an amount"}
          </Button>
        ) : (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

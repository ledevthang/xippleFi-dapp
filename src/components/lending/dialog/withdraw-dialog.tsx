import { useEffect, useMemo, useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import useTokenInfo from "@/hooks/useTokenInfo";
import useTransactions from "@/hooks/use-transactions";
import { POOL_ADDRESS, POOL_ABI } from "@/constants/lending";
import { Address, parseEther } from "viem";
import { useAccount } from "wagmi";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";
import { formatToDecimals } from "@/utils";

export interface WithdrawDialogProps {
  symbol: Token;
  supplied: string;
  asset: Address;
}

export default function WithdrawDialog({
  symbol,
  supplied,
  asset,
}: WithdrawDialogProps) {
  const [amount, setAmount] = useState<string>();
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
        address: POOL_ADDRESS,
        abi: POOL_ABI,
        functionName: "withdraw",
        args: [asset, parseEther(`${amount}`), address],
      });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > +supplied) setAmount(supplied);
    else setAmount(e?.target?.value || undefined);
  };

  const handleSetMaxAmount = () => {
    setAmount(supplied);
  };

  const remainingSupply = useMemo(() => {
    if (amount) return +supplied - +amount;
    return supplied;
  }, [amount, supplied]);

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
          balance={+supplied}
          onSetMaxValue={handleSetMaxAmount}
          amount={Number(amount)}
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
            <span>
              {formatToDecimals(+remainingSupply)} {symbol}
            </span>
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

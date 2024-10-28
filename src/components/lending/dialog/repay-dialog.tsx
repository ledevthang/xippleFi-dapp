import { useEffect, useState } from "react";
import Amount from "./amount";
import { Address, parseEther } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { Token } from "@/types";
import useTransactions from "@/hooks/use-transactions";
import { POOL_ABI, POOL_ADDRESS } from "@/constants/lending";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";
import { TOKENS_CONTRACT_ABI } from "@/constants/swap/token";
import { formatToDecimals } from "@/utils";
import useTokenInfo from "@/hooks/useTokenInfo";

export interface RepayDialogProps {
  symbol: Token;
  asset: Address;
  debt: string;
}

export default function RepayDialog({ symbol, asset, debt }: RepayDialogProps) {
  const [amount, setAmount] = useState<string>();
  const [isRepay, setRepay] = useState(false);

  const { onChange, onClose } = useDialog();
  const { data } = useTokenInfo(symbol);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: asset,
  });

  const { writeContract, isLoading, isSuccess, receipt } = useTransactions();

  const { data: allowance } = useReadContract({
    address: TOKENS_CONTRACT_ABI[symbol].address,
    abi: TOKENS_CONTRACT_ABI[symbol].abi,
    functionName: "allowance",
    args: [address, POOL_ADDRESS],
  });

  const handleApproveToken = () => {
    writeContract({
      address: TOKENS_CONTRACT_ABI[symbol].address,
      abi: TOKENS_CONTRACT_ABI[symbol].abi,
      functionName: "approve",
      args: [POOL_ADDRESS, parseEther(`${amount}`)],
    });
  };

  const handleRepayAsset = () => {
    if (amount) {
      setRepay(true);
      writeContract({
        address: POOL_ADDRESS,
        abi: POOL_ABI,
        functionName: "repay",
        args: [asset, parseEther(amount), BigInt(2), address!],
      });
    }
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > +debt) {
      setAmount(debt);
    } else {
      setAmount(e.target.value || undefined);
    }
  };

  const onSetMaxValue = () => {
    setAmount(debt);
  };

  useEffect(() => {
    if (isSuccess && isRepay) {
      onChange({
        open: true,
        title: "Succeed",
        content: (
          <SuccessDialog
            label={`You repay ${amount} ${symbol}`}
            txHash={receipt?.transactionHash}
          />
        ),
        footer: "Ok, close",
        onSubmit: onClose,
      });
      setRepay(false);
    }
  }, [
    amount,
    isSuccess,
    onChange,
    onClose,
    receipt?.transactionHash,
    symbol,
    isRepay,
  ]);

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
          realTimePrice={data?.asset.realTimePrice}
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
            <span>
              {formatToDecimals(+debt)} {symbol}
            </span>
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
            onClick={allowance ? handleRepayAsset : handleApproveToken}
          >
            {amount
              ? allowance
                ? `Repay ${symbol}`
                : `Approve ${symbol}`
              : "Enter an amount"}
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

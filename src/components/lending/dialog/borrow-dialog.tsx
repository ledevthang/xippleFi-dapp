import { useEffect, useMemo, useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import useTokenInfo from "@/hooks/useTokenInfo";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useTransactions from "@/hooks/use-transactions";
import { POOL_ABI, POOL_ADDRESS } from "@/constants/lending";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";

export interface BorrowDialogProps {
  symbol: Token;
  address?: Address;
  liquidity: bigint;
}

export default function BorrowDialog({
  symbol,
  address,
  liquidity,
}: BorrowDialogProps) {
  const [amount, setAmount] = useState<number>();
  const { data } = useTokenInfo(symbol);
  const { onChange, onClose } = useDialog();

  const { address: onBehalfOf } = useAccount();

  const { data: userAccountData } = useReadContract({
    address: POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: "getUserAccountData",
    args: [onBehalfOf!],
  });

  const { writeContract, isLoading, isSuccess, receipt } = useTransactions();

  const availableBorrow = useMemo(() => {
    if (userAccountData && data?.asset.realTimePrice)
      return (
        Number(userAccountData?.[2]) /
        Math.pow(10, 36) /
        +formatEther(BigInt(data?.asset.realTimePrice || 0))
      );

    return 0;
  }, [userAccountData, data?.asset.realTimePrice]);

  const handleBorrowAsset = () => {
    writeContract({
      address: POOL_ADDRESS,
      abi: POOL_ABI,
      functionName: "borrow",
      args: [address!, parseEther(`${amount}`), BigInt(2), 0, onBehalfOf!],
    });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > +formatEther(liquidity)) {
      setAmount(+formatEther(liquidity));
    } else if (+e.target.value > availableBorrow) {
      setAmount(availableBorrow);
    } else {
      setAmount(+e.target.value || undefined);
    }
  };

  const onSetMaxValue = () => {
    setAmount(availableBorrow);
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
        <h4 className="text-sm font-semibold">Borrow amount</h4>
        <Amount
          label="Available"
          amount={amount}
          onChange={onChangeAmount}
          symbol={symbol}
          realTimePrice={data?.asset.realTimePrice}
          balance={availableBorrow}
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
            onClick={handleBorrowAsset}
          >
            {amount ? `Borrow ${symbol}` : "Enter an amount"}
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

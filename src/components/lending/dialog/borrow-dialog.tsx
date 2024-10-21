import { useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import useTokenInfo from "@/hooks/useTokenInfo";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface BorrowDialogProps {
  symbol: Token;
}

export default function BorrowDialog({ symbol }: BorrowDialogProps) {
  const [amount, setAmount] = useState<number>();

  const { data } = useTokenInfo(symbol);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value || undefined);
  };

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
        <Button
          className="w-full"
          disabled={!amount}
          // onClick={handleSupplyAsset}
        >
          {amount ? `Borrow ${symbol}` : "Enter an amount"}
        </Button>
      </DialogFooter>
    </>
  );
}

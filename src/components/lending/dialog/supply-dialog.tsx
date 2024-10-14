import { useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import { formatToTwoDecimals } from "@/utils";

export interface SupplyDialogProps {
  symbol: Token;
  balance: number;
  apy: number;
}

export default function SupplyDialog({
  symbol,
  balance,
  apy,
}: SupplyDialogProps) {
  const [amount, setAmount] = useState<number>();

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  return (
    <>
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Supply amount</h4>
        <Amount
          label="Wallet balance"
          symbol={symbol}
          balance={balance}
          amount={amount}
          onChange={onChangeAmount}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Supply stats</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Supply APY</span>
            <span>{formatToTwoDecimals(apy)}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Collateral Factor</span>
            <span>75.00%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Used as Collateral</span>
            <span>Yes</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Collateral Balance</span>
            <span>0.00 {symbol}</span>
          </div>
        </div>
      </div>
    </>
  );
}

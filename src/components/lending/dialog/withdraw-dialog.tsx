import { useState } from "react";
import Amount from "./amount";

export default function WithdrawDialog() {
  const [amount, setAmount] = useState<number>();

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  return (
    <>
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Withdraw amount</h4>
        <Amount
          label="Supply balance"
          amount={amount}
          onChange={onChangeAmount}
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
    </>
  );
}

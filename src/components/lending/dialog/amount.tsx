import Asset from "@/components/common/asset";
import { Token } from "@/types";

interface AmountProps {
  label: string;
  symbol: Token;
  balance?: number;
  amount?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Amount({ label, symbol, balance, amount, onChange }: AmountProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 space-x-4 rounded-md border-x p-2">
      <div className="flex items-center gap-2">
        <input
          value={amount}
          onChange={onChange}
          type="number"
          className="flex-1 border-none bg-transparent outline-none"
          placeholder="0.00"
        />
        <Asset symbol={symbol} className="!gap-2" />
      </div>
      <div className="!m-0 flex justify-between text-xs">
        <span>$0</span>
        <div>
          <span>
            {label} {balance}
          </span>
          <span className="ml-2 cursor-pointer font-semibold hover:opacity-90">
            MAX
          </span>
        </div>
      </div>
    </div>
  );
}

export default Amount;

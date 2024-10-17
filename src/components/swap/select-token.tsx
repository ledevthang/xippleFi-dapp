import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOKEN_LOGO, TOKENS } from "@/constants/swap/token";
import { Token as TokenType } from "@/types";

interface SelectTokenProps {
  value?: TokenType;
  onValueChange: (value: TokenType) => void;
}

function SelectToken({ value, onValueChange }: SelectTokenProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[150px] rounded-[8px] border-none bg-[#252B36] outline-none">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        {TOKENS.map(({ symbol }) => (
          <SelectItem value={symbol} key={symbol}>
            <Token symbol={symbol} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectToken;

function Token({ symbol }: { symbol: TokenType }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={TOKEN_LOGO[symbol]}
        alt={symbol}
        className="size-6 object-cover"
      />
      <span className="mt-1 text-base font-semibold">{symbol}</span>
    </div>
  );
}

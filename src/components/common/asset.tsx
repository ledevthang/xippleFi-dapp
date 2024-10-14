import { TOKEN_LOGO } from "@/constants";
import { Token } from "@/types";

interface AssetProps {
  symbol: Token;
  className?: string;
}

function Asset({
  symbol,
  className,
}: AssetProps & {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={TOKEN_LOGO[symbol]}
        alt={symbol}
        className="!size-8 object-contain"
      />
      <p>{symbol}</p>
    </div>
  );
}

export default Asset;

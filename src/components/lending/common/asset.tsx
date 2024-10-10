import { Asset as AssetProps } from "@/types/lending";

function Asset({
  logo,
  symbol,
  className,
}: AssetProps & {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt={symbol} className="size-8 object-contain" />
      <p>{symbol}</p>
    </div>
  );
}

export default Asset;

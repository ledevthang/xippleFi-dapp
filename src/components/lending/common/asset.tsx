import { Asset as AssetProps } from "@/types/lending";

function Asset({ logo, symbol }: AssetProps) {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt={symbol} className="size-8" />
      <p>{symbol}</p>
    </div>
  );
}

export default Asset;

import { Switch } from "@/components/ui/switch";
import { AssetType } from "@/types/balance";
import { YOUR_ASSET_TABLE_HEADER } from "@/constants";
import { formatCurrency, formatToTwoDecimals } from "@/utils";
import Action from "./action";

function YourAssetDetails({ type }: AssetType) {
  const columns = YOUR_ASSET_TABLE_HEADER[type];
  return (
    <div className="mt-6">
      <Header columns={columns} />
      <div className="flex flex-col gap-3">
        <Row type={type} />
        <Row type={type} />
        <Row type={type} />
      </div>
    </div>
  );
}

export default YourAssetDetails;

interface HeaderProps {
  columns: { label: string; className?: string }[];
}

function Header({ columns }: HeaderProps) {
  return (
    <div className="mb-3 grid grid-cols-6 gap-2">
      {columns.map(({ label, className }) => (
        <p className={`${className} text-xs font-bold text-[#8c8c8c]`}>
          {label}
        </p>
      ))}
    </div>
  );
}

function Row({ type }: AssetType) {
  return (
    <div className="grid cursor-pointer grid-cols-6 gap-2 rounded-sm px-2 py-1 transition hover:bg-[#151b28]">
      <div className="col-span-2 text-sm font-bold">
        <div className="flex items-center gap-3">
          <img
            src="https://app.aave.com/icons/tokens/pol.svg"
            alt=""
            className="size-8"
          />
          <p>POL</p>
        </div>
      </div>
      <div className="text-right text-sm font-bold">
        <div className="flex flex-col">
          <p>{formatToTwoDecimals(3)}</p>
          <p className="text-xs">{formatCurrency(2.3)}</p>
        </div>
      </div>
      <div className="flex items-center justify-end text-right text-sm font-bold">
        <p>1.60%</p>
      </div>
      <div className="flex items-center justify-end text-right text-sm font-bold">
        {type === "supply" ? <Switch className="" /> : "26.00%"}
      </div>

      <div className="flex items-center justify-end text-right text-sm font-bold">
        <Action type={type} />
      </div>
    </div>
  );
}

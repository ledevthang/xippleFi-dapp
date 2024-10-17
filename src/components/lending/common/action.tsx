import { Button } from "@/components/ui/button";
import { AssetType } from "@/types/lending";

type ActionsProps = AssetType;

function Action({ type }: ActionsProps) {
  const label = type === "supply" ? "Withdraw" : "Repay";
  return (
    <Button
      variant="default"
      className="flex items-center !px-4 text-xs text-[#69e2db] hover:opacity-75"
    >
      <p>{label}</p>
    </Button>
  );
}

export default Action;

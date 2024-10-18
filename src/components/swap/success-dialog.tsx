import {} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Token } from "@/types";
import { useWatchAsset } from "wagmi";
import { TOKENS_ADDRESS } from "@/constants/swap/token";
import { Address } from "viem";

interface SuccessDialogProps {
  amount: string;
  symbolIn: Token;
  symbolOut: Token;
  txHash?: Address;
}

function SuccessDialog({
  amount,
  symbolIn,
  symbolOut,
  txHash,
}: SuccessDialogProps) {
  const explorer = `https://explorer.xrplevm.org/tx/${txHash}`;
  const { watchAsset } = useWatchAsset();

  const handleWatchAsset = () => {
    watchAsset({
      type: "ERC20",
      options: {
        address: TOKENS_ADDRESS[symbolOut] as string,
        symbol: symbolOut,
        decimals: 18,
      },
    });
  };

  return (
    <div className="text-center">
      <p className="my-4">
        You Switched {amount} {symbolIn}
      </p>

      <a
        href={explorer}
        target="_blank"
        className="mt-2 cursor-pointer italic text-purple-200"
      >
        Review tx details
      </a>

      <div className="rounded-sm border border-[#ebebef14] p-5">
        <p className="mb-4">Add aToken to wallet to track your balance.</p>
        <Button onClick={handleWatchAsset}>Add to wallet</Button>
      </div>
    </div>
  );
}

export default SuccessDialog;

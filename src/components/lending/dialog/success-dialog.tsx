import { Address } from "viem";

interface SuccessDialogProps {
  label: string;
  txHash?: Address;
}

function SuccessDialog({ label, txHash }: SuccessDialogProps) {
  const explorer = `https://explorer.xrplevm.org/tx/${txHash}`;
  return (
    <div className="text-center">
      <div className="rounded-sm border border-[#ebebef14] p-5">
        <p className="">{label}</p>
        <a
          href={explorer}
          target="_blank"
          className="mt-2 cursor-pointer italic text-purple-200"
        >
          Review tx details
        </a>
      </div>
    </div>
  );
}

export default SuccessDialog;

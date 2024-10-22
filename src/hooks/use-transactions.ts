import {
  useTransactionConfirmations,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useTransactions() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const {
    data: receipt,
    isFetching,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const { data: confirm } = useTransactionConfirmations({
    hash: receipt?.transactionHash,
  });

  return {
    hash,
    receipt,
    confirm,
    writeContract,
    isLoading: isPending || isFetching || isLoading || !!(confirm && !confirm),
    isSuccess,
  };
}

export default useTransactions;

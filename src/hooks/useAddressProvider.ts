import { POOL_ABI, POOL_ADDRESS } from "@/constants/lending";
import { useReadContract } from "wagmi";

function useAddressProvider() {
  const { data } = useReadContract({
    address: POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: "ADDRESSES_PROVIDER",
  });
  return data!;
}

export default useAddressProvider;

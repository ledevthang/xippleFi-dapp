import { TOKEN_IDS } from "@/constants/swap/token";
import { getAssetByIdService } from "@/services/swap.service";
import { QUERY_KEY, Token } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useTokenInfo(symbol: Token) {
  const res = useQuery({
    queryKey: [QUERY_KEY.TOKEN_INFO, { symbol: symbol }],
    queryFn: () => getAssetByIdService(TOKEN_IDS[symbol]),
    enabled: !!symbol,
  });

  return res;
}

export default useTokenInfo;

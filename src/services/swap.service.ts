import { API_PATH } from "@/types";
import { TokenInfoResponse } from "@/types/swap";
import AXIOS from "@/utils/axios";

export function getAssetByIdService(
  tokenId: string,
): Promise<TokenInfoResponse> {
  return AXIOS.get(`${API_PATH.ASSETS}/${tokenId}`);
}

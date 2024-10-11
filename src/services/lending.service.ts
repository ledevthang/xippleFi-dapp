import { API_PATH } from "@/types";
import { AssetsReponse } from "@/types/lending";
import AXIOS from "@/utils/axios";

export function getSupplyAssetsService(): Promise<AssetsReponse> {
  return AXIOS.get(API_PATH.ASSETS);
}

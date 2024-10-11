import { API_PATH } from "@/types";
import {
  GetMessageParams,
  GetMessageResponse,
  VerifySignatureParams,
  VerifySignatureResponse,
} from "@/types/auth";
import AXIOS from "@/utils/axios";

export function getMessageService(
  params: GetMessageParams,
): Promise<GetMessageResponse> {
  return AXIOS.get(API_PATH.AUTH_MESSAGE, { params });
}

export function verifySignatureService(
  params: VerifySignatureParams,
): Promise<VerifySignatureResponse> {
  return AXIOS.post(API_PATH.AUTH_VERIFY_SIGNATURE, { ...params });
}

export interface GetMessageParams {
  address: string;
}

export interface GetMessageResponse {
  message: string;
}

export interface VerifySignatureParams {
  address: string;
  message: string;
  signature: string;
}

export interface VerifySignatureResponse {
  accessToken: string;
}

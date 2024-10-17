import { Address } from "viem";
import { Token } from ".";

export interface TokenInfo {
  id: string;
  address: Address;
  realTimePrice: string;
  price: string;
  symbol: Token;
}

export interface TokenInfoResponse {
  asset: TokenInfo;
}

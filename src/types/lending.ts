import { Token } from ".";

export interface AssetType {
  type: "supply" | "borrow";
}

export interface SupplyAsset {
  id: string;
  symbol: Token;
  apy: number;
  address: `0x${string}`;
  balance?: number;
}

export interface AssetsReponse {
  assets: SupplyAsset[];
}

export interface LendingAssets extends SupplyAsset {
  wallet?: number;
  liquidity?: string;
}

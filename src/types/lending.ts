import { TokenLogo } from ".";

export interface AssetType {
  type: "supply" | "borrow";
}

export interface Asset {
  symbol: TokenLogo;
}

export interface LendingAssets extends Asset {
  apy?: number;
  wallet?: number;
  liquidity?: string;
}

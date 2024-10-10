export interface Asset {
  logo: string;
  symbol: string;
}

export interface LendingAssets extends Asset {
  apy: number;
  wallet?: number;
  liquidity?: string;
}

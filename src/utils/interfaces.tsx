export interface IScrollLink {
  id: number;
  label: string;
  to: string;
}

export interface IInvestedToken {
  id: number;
  token_symbol: string;
  token_name: string;
  img_src: string;
}

export interface ISaleStage {
  id: number;
  name: string;
  enabled: boolean;
  scotty_price_in_usd: number;
  hard_cap: number;
  claimed_scotty_amount: number;
  start_at: number;
  end_at: number;
}
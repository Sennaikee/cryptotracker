interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

interface CoinDataProps {
  id: string;
  symbol: string;
  name: string;
  webslug: string;
  asset_platforms: string[];
  platforms: object;
  detail_platforms: object;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string;
  additional_notices: string[];
  localization: object;
  description: object;
  links: object;
  image: object;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_data: object;
  community_data: object;
  developer_data: object;
  public_interest_stats: object;
  status_updates: object[];
  last_updated: string;
  tickers: object[];
}

export default CoinProps;

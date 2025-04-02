export type ConversionType = "asset-to-currency" | "currency-to-asset";

export type ApiResponseItem = {
  id: string;
  symbol: string;
  name: string;
};

export type SelectOption = {
  value: string;
  label: string;
};
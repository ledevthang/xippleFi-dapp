export const columnStyles = `flex items-center text-sm font-bold`;

export const YOUR_ASSET_TABLE_HEADER = {
  supply: [
    {
      label: "SUPPLIED ASSET",
      className: "col-span-2",
    },
    {
      label: "BALANCE",
      className: "text-right",
    },
    {
      label: "APY",
      className: "text-right",
    },
    {
      label: "COLLATERA",
      className: "text-right",
    },
  ],
  borrow: [
    {
      label: "BORROWED ASSET",
      className: "col-span-2",
    },
    {
      label: "BALANCE",
      className: "text-right",
    },
    {
      label: "APY",
      className: "text-right",
    },
    {
      label: "BORROW LIMIT",
      className: "text-right",
    },
  ],
};

export const ASSETS_TO_SUPPLY_HEADER = [
  {
    label: "ASSETS",
    className: "col-span-2",
  },
  {
    label: "SUPPLY APY",
    className: "text-right",
  },
  {
    label: "WALLET",
    className: "text-right",
  },
];

export const ASSETS_TO_BORROW_HEADER = [
  {
    label: "ASSETS",
    className: "col-span-2",
  },
  {
    label: "BORROW APY",
    className: "text-right",
  },
  {
    label: "LIQUIDITY",
    className: "text-right",
  },
];

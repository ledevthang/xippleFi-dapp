import { formatToTwoDecimals } from "@/utils";
import Asset from "../common/asset";
import { ASSETS_TO_BORROW_HEADER, columnStyles } from "../common/columns";
import Header from "../common/header";
import Row from "../common/row";
import { LendingAssets } from "@/types/lending";

interface BorrowAssetsProps {
  data: LendingAssets[];
}

function BorrowAssets({ data }: BorrowAssetsProps) {
  return (
    <div className="bg-color-secondary flex-1 rounded-sm p-4">
      <Header columns={ASSETS_TO_BORROW_HEADER} className="grid-cols-5" />
      <div className="flex flex-col gap-3">
        {data.map(({ logo, symbol, apy, liquidity }) => (
          <Row key={symbol}>
            <div className={`${columnStyles} col-span-3`}>
              <Asset logo={logo} symbol={symbol} />
            </div>
            <div className={`${columnStyles} justify-end`}>
              <p>{formatToTwoDecimals(apy)}%</p>
            </div>
            <div className={`${columnStyles} justify-end`}>
              <span>{liquidity}</span>
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

export default BorrowAssets;

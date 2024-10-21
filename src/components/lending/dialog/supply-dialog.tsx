import { useEffect, useState } from "react";
import Amount from "./amount";
import { Token } from "@/types";
import { formatToDecimals } from "@/utils";
import { ADDRESS, POOL_ABI } from "@/constants/lending";
import useTransactions from "@/hooks/use-transactions";
import { useAccount, useReadContract } from "wagmi";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useTokenInfo from "@/hooks/useTokenInfo";
import { formatEther, parseEther } from "viem";
import { TOKENS_CONTRACT_ABI } from "@/constants/swap/token";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "./success-dialog";

export interface SupplyDialogProps {
  symbol: Token;
  balance: number;
  apy: number;
}

export default function SupplyDialog({
  symbol,
  balance,
  apy,
}: SupplyDialogProps) {
  const { address: onBehalfOf } = useAccount();
  const [amount, setAmount] = useState<number>();
  const [isSupply, setSupply] = useState(false);

  const { onChange, onClose } = useDialog();
  const { data } = useTokenInfo(symbol);

  const {
    receipt,
    writeContract,
    isLoading: isLoadingTransaction,
    isSuccess,
  } = useTransactions();

  const { data: allowance, refetch } = useReadContract({
    address: TOKENS_CONTRACT_ABI[symbol].address,
    abi: TOKENS_CONTRACT_ABI[symbol].abi,
    functionName: "allowance",
    args: [onBehalfOf, ADDRESS],
  });

  const handleApproveToken = () => {
    writeContract({
      address: TOKENS_CONTRACT_ABI[symbol].address,
      abi: TOKENS_CONTRACT_ABI[symbol].abi,
      functionName: "approve",
      args: [ADDRESS, parseEther(`${balance}`)],
    });
  };

  const handleSupplyAsset = () => {
    setSupply(true);
    if (onBehalfOf && amount && data?.asset.address)
      writeContract({
        address: ADDRESS,
        abi: POOL_ABI,
        functionName: "supply",
        args: [data?.asset.address, parseEther(`${amount}`), onBehalfOf],
      });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value && +e.target.value > balance) setAmount(balance);
    else setAmount(+e?.target?.value || undefined);
  };

  const onSetMaxValue = () => {
    setAmount(balance);
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (amount && isSuccess && isSupply) {
      onChange({
        open: true,
        title: `Supplied`,
        content: (
          <SuccessDialog
            label={` You Supplied ${amount} ${symbol}`}
            txHash={receipt?.transactionHash}
          />
        ),
        footer: "Ok, close",
        onSubmit: onClose,
      });
      setSupply(false);
    }
  }, [
    amount,
    isSuccess,
    isSupply,
    onChange,
    onClose,
    receipt?.transactionHash,
    symbol,
  ]);

  return (
    <>
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Supply amount</h4>
        <Amount
          label="Wallet balance"
          symbol={symbol}
          balance={balance}
          amount={amount}
          onChange={onChangeAmount}
          onSetMaxValue={onSetMaxValue}
          realTimePrice={data?.asset?.realTimePrice}
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold">Supply stats</h4>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span>Supply APY</span>
            <span>{formatToDecimals(apy)}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Collateral Factor</span>
            <span>75.00%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Used as Collateral</span>
            <span>Yes</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Collateral Balance</span>
            <span>0.00 {symbol}</span>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-6 flex-1 !justify-center">
        {!isLoadingTransaction ? (
          <>
            {amount ? (
              allowance &&
              +formatEther(BigInt(allowance as never)) >= amount ? (
                <Button
                  className="w-full"
                  disabled={!amount}
                  onClick={handleSupplyAsset}
                >
                  {`Supply ${symbol}`}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={!amount}
                  onClick={handleApproveToken}
                >
                  {`Approve ${symbol} to continue`}
                </Button>
              )
            ) : (
              <Button className="w-full" disabled={!amount}>
                Enter an amount
              </Button>
            )}
          </>
        ) : (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

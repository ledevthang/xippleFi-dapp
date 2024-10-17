import SelectToken from "@/components/swap/select-token";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TOKEN_IDS,
  TOKENS_ADDRESS,
  TOKENS_CONTRACT_ABI,
} from "@/constants/swap/token";
import { CONTRACT_SWAP_API } from "@/constants/swap";
import { getAssetByIdService } from "@/services/swap.service";
import { QUERY_KEY, Token } from "@/types";
import { formatToDecimals } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useTransactionConfirmations,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { tokenToUsd } from "@/utils/swap";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialog from "@/hooks/use-dialog";
import SuccessDialog from "@/components/swap/success-dialog";

function SwapPage() {
  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOut, setAmountOut] = useState<string>("");
  const [symbolIn, setSymbolIn] = useState<Token>("XRP");
  const [symbolOut, setSymbolOut] = useState<Token>("USDT");

  const [isSwap, setSwap] = useState(false);

  const { onChange, onClose } = useDialog();

  const { address } = useAccount();

  const { data: balanceIn } = useBalance({
    address: address,
    token: TOKENS_ADDRESS[symbolIn],
  });

  const { data: balanceOut } = useBalance({
    address: address,
    token: TOKENS_ADDRESS[symbolOut],
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const {
    data: receipt,
    isFetching,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  const { data: confirm } = useTransactionConfirmations({
    hash: receipt?.transactionHash,
  });

  const {
    data: allowance,
    refetch: refetchAllowance,
    isFetching: isFetchingAllowance,
  } = useReadContract({
    ...TOKENS_CONTRACT_ABI[symbolIn],
    functionName: "allowance",
    args: [address, CONTRACT_SWAP_API.address],
  });

  const { data: amountsOut } = useReadContract({
    ...CONTRACT_SWAP_API,
    functionName: "getAmountsOut",
    args: [
      Number(parseEther(amountIn, "wei")),
      [TOKENS_ADDRESS[symbolIn], TOKENS_ADDRESS[symbolOut]],
    ],
  });

  const { data: tokenInInfo } = useQuery({
    queryKey: [QUERY_KEY.TOKEN_IN, { symbol: symbolIn }],
    queryFn: () => getAssetByIdService(TOKEN_IDS[symbolIn]),
    enabled: !!symbolIn,
  });

  const { data: tokenOutInfo } = useQuery({
    queryKey: [QUERY_KEY.TOKEN_OUT, { symbol: symbolOut }],
    queryFn: () => getAssetByIdService(TOKEN_IDS[symbolOut]),
    enabled: !!symbolOut,
  });

  const tokenInToUsd = useMemo(() => {
    if (tokenInInfo && amountIn) {
      return tokenToUsd(tokenInInfo?.asset.realTimePrice, amountIn);
    }
    return 0;
  }, [amountIn, tokenInInfo]);

  const tokenOutToUsd = useMemo(() => {
    if (tokenOutInfo && amountOut) {
      return tokenToUsd(tokenOutInfo?.asset.realTimePrice, amountOut);
    }
    return 0;
  }, [amountOut, tokenOutInfo]);

  const handleSelectAddressIn = (symbol: Token) => {
    if (symbol === symbolOut) setSymbolOut(symbolIn);
    setSymbolIn(symbol);
  };

  const handleSelectAddressOut = (symbol: Token) => {
    if (symbol === symbolIn) setSymbolIn(symbolOut);
    setSymbolOut(symbol);
  };

  const handleSetMaxTokenAmount = () => {
    if (balanceIn?.value) setAmountIn(`${balanceIn?.formatted}`);
  };

  const handleSwapAddress = () => {
    if (symbolIn && symbolOut) {
      setSymbolIn(symbolOut);
      setSymbolOut(symbolIn);
    }
    if (!amountIn) {
      setAmountOut("");
    }
  };

  const handleApproveAllowance = () => {
    if (amountsOut) {
      writeContract({
        ...TOKENS_CONTRACT_ABI[symbolIn],
        functionName: "approve",
        args: [CONTRACT_SWAP_API.address, (amountsOut as never)[0]],
      });
    }
  };

  const handleSwapToken = () => {
    setSwap(true);
    const currentTime = new Date();
    const timestamp = currentTime.getTime();
    const newTimestamp = timestamp + 1000;
    if (amountsOut)
      writeContract({
        ...CONTRACT_SWAP_API,
        functionName: "swapTokensForExactTokens",
        args: [
          (amountsOut as never)[1],
          (amountsOut as never)[0],
          [TOKENS_ADDRESS[symbolIn], TOKENS_ADDRESS[symbolOut]],
          address,
          newTimestamp,
        ],
      });
  };

  const Action = useMemo(() => {
    if (isFetching || isPending || isLoading || (confirm && !confirm))
      return (
        <Button disabled className="h-11 w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      );

    if (!amountIn)
      return (
        <Button
          className="h-11 w-full text-lg font-semibold"
          variant="secondary"
          disabled
        >
          Swap
        </Button>
      );

    if (balanceIn && +balanceIn?.formatted < +amountIn) {
      return (
        <Button
          className="h-11 w-full text-lg font-semibold"
          variant="secondary"
          disabled
        >
          Insufficient {balanceIn.symbol} balance
        </Button>
      );
    }

    if (
      !allowance ||
      (amountIn &&
        amountOut &&
        allowance &&
        +formatEther(allowance as never) < +amountIn)
    ) {
      return (
        <Button
          className="h-11 w-full text-lg font-semibold"
          variant="secondary"
          onClick={handleApproveAllowance}
        >
          Approve
        </Button>
      );
    }

    return (
      <Button
        className="h-11 w-full text-lg font-semibold"
        variant="secondary"
        onClick={handleSwapToken}
      >
        Swap
      </Button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFetching,
    isPending,
    isLoading,
    isFetchingAllowance,
    confirm,
    amountIn,
    balanceIn,
    allowance,
    amountOut,
  ]);

  useEffect(() => {
    if (amountsOut) {
      const amount = formatEther((amountsOut as never)[1]);
      setAmountOut(formatToDecimals(+amount, 5));
    }
  }, [amountsOut]);

  useEffect(() => {
    if (isSuccess && isSwap) {
      onChange({
        open: true,
        title: "All done!",
        content: (
          <SuccessDialog
            amount={amountIn}
            symbolIn={symbolIn}
            symbolOut={symbolOut}
            txHash={receipt?.transactionHash}
          />
        ),
        footer: "Ok, Close",
        onSubmit: onClose,
      });

      setSwap(false);
      setAmountIn("");
      setAmountOut("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountIn, isSuccess, receipt?.transactionHash, symbolIn]);

  useEffect(() => {
    if (!confirm) return;
    refetchAllowance();
  }, [confirm, refetchAllowance]);

  return (
    <div className="bg-swap flex-1 pb-10">
      <div className="container mx-auto flex h-full w-full">
        <div className="m-auto w-[370px] rounded bg-[#252B36] p-4 sm:w-[472px]">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Swap</h3>
            </div>

            <div className="relative flex flex-col gap-4">
              <div
                className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer hover:opacity-60"
                onClick={handleSwapAddress}
              >
                <img src="/icons/arrow.svg" alt="" />
              </div>

              <div className="h-[100px] rounded-[12px] bg-[#2B3342] px-3 py-4">
                <div className="flex items-center justify-between">
                  <input
                    className="bg-transparent text-base font-semibold outline-none"
                    placeholder="0.00"
                    value={amountIn}
                    onChange={(e) => {
                      setAmountIn(e.target.value);
                      if (!e.target.value) setAmountOut("");
                    }}
                  />
                  <SelectToken
                    value={symbolIn}
                    onValueChange={handleSelectAddressIn}
                  />
                </div>

                {symbolIn && (
                  <div className="!m-0 flex justify-between pt-3 text-sm">
                    <span>$ {tokenInToUsd}</span>
                    <div>
                      {balanceIn ? (
                        <>
                          <span>
                            Balance: {formatToDecimals(+balanceIn?.formatted)}{" "}
                            {balanceIn?.symbol}
                          </span>
                          <span
                            onClick={handleSetMaxTokenAmount}
                            className="ml-2 cursor-pointer font-semibold hover:opacity-90"
                          >
                            MAX
                          </span>
                        </>
                      ) : (
                        <Skeleton className="h-4 w-20 bg-red-50" />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-[100px] rounded-[12px] bg-[#2B3342] px-3 py-4">
                <div className="flex items-center justify-between">
                  <input
                    className="bg-transparent text-base font-semibold outline-none"
                    placeholder="0.00"
                    defaultValue={amountOut}
                    disabled
                  />
                  <SelectToken
                    value={symbolOut}
                    onValueChange={handleSelectAddressOut}
                  />
                </div>
                {symbolOut && (
                  <div className="!m-0 flex justify-between pt-3 text-sm">
                    <span>$ {tokenOutToUsd}</span>
                    <div>
                      {balanceOut ? (
                        <span>
                          Balance: {formatToDecimals(+balanceOut?.formatted)}{" "}
                          {balanceOut?.symbol}
                        </span>
                      ) : (
                        <Skeleton className="h-4 w-20 bg-red-50" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-[76px mt-6 flex flex-col justify-end">
              <div className="h-8 text-right text-sm font-semibold">
                {!!amountsOut && (
                  <span>
                    1 {balanceOut?.symbol} ≈{" "}
                    {formatToDecimals(
                      +formatEther((amountsOut as never)?.[0]) /
                        +formatEther((amountsOut as never)?.[1]),
                      5,
                    )}{" "}
                    {symbolIn}
                  </span>
                )}
              </div>

              {Action}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPage;

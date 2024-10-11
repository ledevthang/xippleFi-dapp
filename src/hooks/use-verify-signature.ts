import {
  getMessageService,
  verifySignatureService,
} from "@/services/auth.service";
import { SECURE_SROGARE } from "@/types";
import secureStorage from "@/utils/secureStorage";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Account } from "viem";
import {
  useAccount,
  useAccountEffect,
  useDisconnect,
  useSignMessage,
} from "wagmi";

function useVerifySignature() {
  const [isLoading, setLoading] = useState<boolean>();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const accessToken = secureStorage.getItem(SECURE_SROGARE.ACCESS_TOKEN);

  const { mutateAsync: verifySignature } = useMutation({
    mutationFn: verifySignatureService,
    onSuccess: (data) => {
      secureStorage.setItem(SECURE_SROGARE.ACCESS_TOKEN, data.accessToken);
    },
    onError: () => {
      disconnect();
    },
  });

  const onSignMessage = async (
    address: `0x${string}` | Account | undefined,
  ) => {
    try {
      setLoading(true);
      const { message } = await getMessageService({
        address: address as string,
      });

      const signature = await signMessageAsync({
        message: message,
        account: address,
      });
      if (signature)
        await verifySignature({
          address: address as string,
          message: message,
          signature,
        });
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      setLoading(false);
      disconnect();
      localStorage.clear();
    }
  };

  useAccountEffect({
    onConnect: async (data) => {
      if (!accessToken) {
        setLoading(true);
        setCurrentAddress(data.address);
        try {
          await onSignMessage(data.address);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
          setLoading(false);
          localStorage.clear();
          throw new Error();
        }
      }
    },
  });

  useEffect(() => {
    if (currentAddress && address) {
      if (currentAddress !== address) {
        setCurrentAddress(address);
        onSignMessage(address);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, currentAddress]);

  useEffect(() => {
    if (!accessToken) disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (!isConnected) {
      localStorage.clear();
      setCurrentAddress(undefined);
    }
  }, [isConnected]);

  return {
    isLoading: isLoading || isConnecting,
  };
}

export default useVerifySignature;

import Navbar from "./navbar";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useVerifySignature from "@/hooks/use-verify-signature";

function Header() {
  const { isLoading } = useVerifySignature();

  return (
    <div className="stick bg bg-[url('/images/navbar-bg.svg')] bg-contain bg-no-repeat">
      <div className="border-b-1 container mx-auto flex max-h-20 min-h-20 items-center justify-between px-3">
        <div className="flex cursor-pointer items-center gap-20">
          <a href="/" className="logo">
            XippleFi
          </a>
          <Navbar />
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <Button disabled className="!w-[138px]">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <ConnectKitButton
              showAvatar={false}
              showBalance={true}
              theme="retro"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

import Navbar from "./navbar";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useVerifySignature from "@/hooks/use-verify-signature";
import NavbarXs from "./navbar-xs";

function Header() {
  const { isLoading } = useVerifySignature();

  return (
    <div className="sticky top-0 z-20 border-b border-[#ebebef14] bg-[url('/images/navbar-bg.svg')] bg-cover bg-no-repeat">
      <div className="border-b-1 container mx-auto flex max-h-20 min-h-20 items-center justify-between border-b border-[#ebebef14] px-3">
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
              customTheme={{
                "--ck-font-family": '"Oxanium", sans-serif',
                " --ck-connectbutton-background": `url("/images/connect-button-bg.svg") no-repeat left top / cover, url("/images/connect-button-bg.svg") no-repeat right top / cover`,
                "--ck-connectbutton-hover-background": `url("/images/connect-button-bg.svg") no-repeat left top / cover`,
                "--ck-connectbutton-active-background": `url("/images/connect-button-bg.svg") no-repeat right top / cover`,
              }}
            />
          )}

          <NavbarXs />
        </div>
      </div>
    </div>
  );
}

export default Header;

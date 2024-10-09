import logo from "@/assets/logo.svg";
import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { shortenAddress } from "@/utils";

function Header() {
  return (
    <div className="stick bg-[url('/images/navbar-bg.svg')] bg-cover bg-no-repeat">
      <div className="border-b-1 container mx-auto flex max-h-20 min-h-20 items-center justify-between">
        <div className="flex cursor-pointer items-center gap-20">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
          <Navbar />
        </div>

        <div className="flex items-center">
          <Button variant="secondary">Connect</Button>
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button variant="default" className="text-[#69e2db]">
            {shortenAddress("0x0f0A05FdFb3b7450EAFBBd569E3D848C9097Ad8F")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;

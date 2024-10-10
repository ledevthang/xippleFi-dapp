import Navbar from "./navbar";
import { ConnectKitButton } from "connectkit";

function Header() {
  return (
    <div className="stick bg bg-[url('/images/navbar-bg.svg')] bg-contain bg-no-repeat">
      <div className="border-b-1 container mx-auto flex max-h-20 min-h-20 items-center justify-between">
        <div className="flex cursor-pointer items-center gap-20">
          <a href="/" className="logo">
            XippleFi
          </a>
          <Navbar />
        </div>
        <div className="flex items-center">
          <ConnectKitButton
            showAvatar={false}
            showBalance={true}
            theme="retro"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

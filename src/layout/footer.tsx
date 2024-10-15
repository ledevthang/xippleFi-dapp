import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

function Footer() {
  return (
    <div className="flex items-center border-t border-[#ebebef14] bg-[url('/images/footer-bg.svg')] bg-cover py-10">
      <div className="container mx-auto flex flex-row flex-wrap gap-y-10 px-3 sm:justify-between">
        <div className="basis-1/2 sm:basis-2/5">
          <a href="/" className="logo">
            XippleFi
          </a>
          <div className="mt-2 flex cursor-pointer gap-3">
            <TwitterLogoIcon className="size-7" />
            <LinkedInLogoIcon className="size-7" />
            <GitHubLogoIcon className="size-7" />
          </div>
        </div>

        <ul className="flex basis-1/2 flex-col gap-5 text-base sm:basis-1/5">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookies</li>
        </ul>

        <ul className="flex basis-1/2 flex-col gap-5 text-base sm:basis-1/5">
          <li>Tokenomics</li>
          <li>Team section</li>
          <li>About Us</li>
          <li>Techonlogy</li>
        </ul>

        <ul className="flex basis-1/2 flex-col gap-5 text-base sm:basis-1/5">
          <li>Github</li>
          <li>Documentation</li>
          <li>Whitepaper</li>
          <li>UI Press kit</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

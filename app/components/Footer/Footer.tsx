import FooterLink from "./FooterLink";

import FacebookIcon from "@icon/FacebookIcon";
import InstagramIcon from "@icon/InstagramIcon";
import TwitterIcon from "@icon/TwitterIcon";
import YoutubeIcon from "@icon/YoutubeIcon";

const Footer = () => {
  return (
    <footer className="mt-32 bg-primary-black-100 py-8">
      <div className="container mx-auto flex flex-col items-center px-8 md:flex-row md:justify-between md:px-16 lg:px-32">
        <div className="text-sm text-gray-600 md:mb-0">&copy;codeit - 2023</div>
        <div className="flex gap-8 md:mb-0">
          <span className="text-sm text-gray-400">Privacy Policy</span>
          <span className="text-sm text-gray-400">FAQ</span>
        </div>
        <div className="flex gap-4">
          <FooterLink href="https://www.facebook.com/">
            <FacebookIcon />
          </FooterLink>
          <FooterLink href="https://www.twitter.com/">
            <TwitterIcon />
          </FooterLink>
          <FooterLink href="https://www.youtube.com/">
            <YoutubeIcon />
          </FooterLink>
          <FooterLink href="https://www.instagram.com/">
            <InstagramIcon />
          </FooterLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

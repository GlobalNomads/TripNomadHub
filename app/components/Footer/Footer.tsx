import Link from "next/link";
import FooterLink from "./FooterLink";

import FacebookIcon from "@/assets/icon/FacebookIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";
import TwitterIcon from "@/assets/icon/TwitterIcon";
import YoutubeIcon from "@/assets/icon/YoutubeIcon";

const Footer = () => {
  return (
    <footer className="px-26 flex items-start justify-between whitespace-nowrap bg-primary-black-100 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-sm text-gray-600">&copy;codeit - 2023</div>
        <div className="flex gap-8">
          <Link href="/privacypolicy" className="text-sm text-gray-400">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-sm text-gray-400">
            FAQ
          </Link>
        </div>
        <div className="flex w-28 justify-between">
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

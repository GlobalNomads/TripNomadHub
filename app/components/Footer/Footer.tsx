import React from 'react';
import Link from 'next/link';
import FooterLink from './FooterLink';

import FacebookIcon from '../../assets/icon/FacebookIcon';
import InstagramIcon from '../../assets/icon/InstagramIcon';
import TwitterIcon from '../../assets/icon/TwitterIcon';
import YoutubeIcon from '../../assets/icon/YoutubeIcon';

const Footer = () => {
  return (
    <footer className="bg-primary-black-100 py-8 px-26 flex justify-between items-start whitespace-nowrap">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="text-gray-600 text-sm">&copy;codeit - 2023</div>
        <div className="flex gap-8">
          <Link href="/privacypolicy" className="text-gray-400 text-sm">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-gray-400 text-sm">
            FAQ
          </Link>
        </div>
        <div className="flex justify-between w-28">
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
}

export default Footer;
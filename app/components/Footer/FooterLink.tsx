import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children?: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <div className="p-2 hover:bg-gray-800 rounded-full">
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default FooterLink;

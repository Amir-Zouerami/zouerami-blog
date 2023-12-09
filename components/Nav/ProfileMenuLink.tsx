import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileMenuLinkProps {
  icon: StaticImport;
  title: string;
  subtitle: string;
  href: string;
  onClick?: () => void;
}

function ProfileMenuLink({
  icon,
  title,
  subtitle,
  href,
  onClick,
}: ProfileMenuLinkProps) {
  return (
    <div onClick={onClick}>
      <Link href={href} className="reactiveButton flex py-5">
        <Image
          src={icon}
          style={{ width: '35px', height: '35px' }}
          alt="see your liked articles"
          className="svg-current-gray dark:filter-none"
        />
        <div className="mr-3">
          <p className="font-bold text-[#464646] dark:text-white">{title}</p>
          <p className="py-1 text-sm text-[#4a4a4a] dark:text-gray-400">
            {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProfileMenuLink;

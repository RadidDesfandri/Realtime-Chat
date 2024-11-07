"use client";

import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `group flex w-full items-center justify-center gap-x-3 p-3 text-sm font-semibold leading-6 text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-dark`,
        active && "bg-gray-100 text-black",
      )}
    >
      <Icon className="h-6 w-6 shrink-0" />
    </Link>
  );
};

export default MobileItem;

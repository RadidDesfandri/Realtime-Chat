"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  href,
  label,
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
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-all duration-300 hover:bg-gray-100 hover:text-dark`,
          active ? "bg-gray-100 text-dark" : "text-gray-500",
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;

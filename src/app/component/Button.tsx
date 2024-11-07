"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 font-semibold text-dark`,
        disabled && "cursor-default text-gray-700 opacity-50",
        secondary &&
          "bg-main hover:bg-mainDark text-light transition-all duration-300 disabled:bg-gray-700 disabled:text-gray-100",
        fullWidth && "w-full",
        danger &&
          "bg-rose-500 text-light transition-all duration-300 hover:bg-rose-600",
      )}
    >
      {children}
    </button>
  );
};

export default Button;

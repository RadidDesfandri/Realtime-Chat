"use client";

import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex w-full justify-center rounded-md px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100"
    >
      <Icon size={25} />
    </button>
  );
};

export default AuthSocialButton;

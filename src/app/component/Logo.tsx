import Link from "next/link";
import { TbMessageChatbotFilled } from "react-icons/tb";

interface LogoProps {
  size?: string;
  light?: boolean;
  href?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 60, light, href }) => {
  return (
    <Link href={href ? href : ""}>
      <TbMessageChatbotFilled
        size={size}
        className={`cursor-pointer ${light ? "text-mainDark" : "text-main"}`}
      />
    </Link>
  );
};

export default Logo;

import Link from "next/link";
import ImportedLogo from "../10alytics";

const Logo = ({ className = "", mobile = false }) => {
  return (
    <Link href="/">
      <ImportedLogo />
    </Link>
  );
};

export default Logo;

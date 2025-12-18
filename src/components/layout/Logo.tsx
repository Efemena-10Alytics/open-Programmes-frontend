import Link from "next/link";

const Logo = ({ className = "", mobile = false }) => {
  return (
    <Link href="/">
      <img
        src="/img/mixedLogo.png"
        alt="Logo"
        className={`${mobile ? "h-12 mt-4" : ""} ${className}`}
      />
    </Link>
  );
};

export default Logo;

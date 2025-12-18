import { MdLogout } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
const Logout = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="bg-primary w-full flex justify-center gap-2 items-center p-2 mt-12 rounded-full text-[12px] text-white font-bold"
    >
      <span>Log out</span>
      <MdLogout />
    </button>
  );
};

export default Logout;

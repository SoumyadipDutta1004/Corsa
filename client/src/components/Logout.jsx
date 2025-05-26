import { useNavigate } from "react-router";
import { axiosInstance } from "../utils/axios";
import { useUserStore } from "../utils/store";

export default function Logout() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout); 

  async function handleLogout() {
    try {
      axiosInstance.post("/auth/logout");
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      className="text-sm text-neutral-400 cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

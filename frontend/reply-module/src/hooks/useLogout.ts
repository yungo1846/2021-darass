import { COOKIE_KEY } from "../constants/cookie";
import { setCookie } from "../utils/cookie";

// TODO: react-query 적용
const useLogout = () => {
  const logout = async () => {
    try {
      setCookie(COOKIE_KEY.ATK, "");
    } catch (error) {
      console.error(error.message);
    }
  };

  return { logout };
};

export default useLogout;

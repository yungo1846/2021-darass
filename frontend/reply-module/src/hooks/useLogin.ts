import { QUERY } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { request } from "../utils/request";
import { setCookie } from "../utils/cookie";
import { getKakaoAccessToken } from "../utils/kakaoAPI";

// TODO: react-query 적용
const useLogin = () => {
  const login = async () => {
    try {
      const kakaoAccessToken = await getKakaoAccessToken();
      const { data: serverAccessToken } = await request.GET(`${QUERY.LOGIN}${kakaoAccessToken}`);

      setCookie(COOKIE_KEY.ATK, serverAccessToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  return { login };
};

export default useLogin;

import { useEffect } from "react";

const useKakaoAuth = () => {
  const { Kakao } = window;

  const onLogin = () => {
    Kakao.Auth.login({
      success: function (authObj: { access_token: string }) {
        const accessToken = JSON.stringify(authObj.access_token);

        alert(JSON.stringify(accessToken));
      },
      fail: function (err: Error) {
        alert(JSON.stringify(err));
      }
    });
  };

  useEffect(() => {
    Kakao.init(process.env.KAKAO_JAVASCRIPT_API_KEY);
  });

  return { onLogin };
};

export default useKakaoAuth;

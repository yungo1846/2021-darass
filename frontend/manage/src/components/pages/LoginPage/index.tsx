import { useEffect } from "react";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Login from "../../templates/Login";

const { Kakao } = window;

const loginWithKakao = () => {
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

const LoginPage = () => {
  const onLoginWithKakao = () => {
    loginWithKakao();
  };

  useEffect(() => {
    Kakao.init(process.env.KAKAO_JAVASCRIPT_API_KEY);
  });

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Login onLoginWithKakao={onLoginWithKakao} />
    </ScreenContainer>
  );
};

export default LoginPage;

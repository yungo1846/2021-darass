import useLogin from "../../../hooks/useLogin";
import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Login from "../../templates/Login";

const LoginPage = () => {
  const { login } = useLogin();

  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Login onLoginWithKakao={login} />
    </ScreenContainer>
  );
};

export default LoginPage;

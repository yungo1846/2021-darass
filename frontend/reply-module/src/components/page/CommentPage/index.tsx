import { useLogin } from "../../../hooks";
import CommentArea from "../../templates/CommentArea";

const CommentPage = () => {
  const { login } = useLogin();

  return <CommentArea onLoginWithKakao={login} />;
};

export default CommentPage;

import { useKakaoAuth } from "../../../hooks";
import CommentArea from "../../templates/CommentArea";

const CommentPage = () => {
  const { onLogin: onLoginWithKakao } = useKakaoAuth();

  return <CommentArea onLoginWithKakao={onLoginWithKakao} />;
};

export default CommentPage;

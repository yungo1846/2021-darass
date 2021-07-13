import { COOKIE_KEY } from "../../../constants/cookie";
import { useLogin, useLogout } from "../../../hooks";
import { User } from "../../../types/user";
import { getCookie } from "../../../utils/cookie";
import CommentArea from "../../templates/CommentArea";

const mockFetchUser = () => {
  const atk = getCookie(COOKIE_KEY.ATK);

  const dummyUser: User = {
    id: 1,
    nickName: "도비",
    imageURL:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75",
    type: "Signed"
  };

  return atk !== "" ? dummyUser : null;
};

const CommentPage = () => {
  const { login } = useLogin();
  const { logout } = useLogout();

  const user = mockFetchUser();

  return <CommentArea user={user} onLogin={login} onLogout={logout} />;
};

export default CommentPage;

import { Comment } from "../../../types";
import { User } from "../../../types/user";
import UserAvatarOption from "../../molecules/UserAvatarOption";
import CommentInput from "../../organisms/CommentInput";
import CommentList from "../../organisms/CommentList";
import { Container, Header, CommentCount, CommentCountWrapper, CommentListWrapper } from "./styles";

export interface Props {
  user?: User;
}

const CommentArea = ({ user }: Props) => {
  const comments: Comment[] = [];

  return (
    <Container>
      <Header>
        <CommentCountWrapper>
          댓글 <CommentCount>{comments.length}</CommentCount>
        </CommentCountWrapper>

        <UserAvatarOption user={user}>
          <span>{user ? "로그아웃" : "카카오로 로그인"}</span>
        </UserAvatarOption>
      </Header>
      <CommentInput />
      <CommentListWrapper>
        <CommentList comments={comments} />
      </CommentListWrapper>
    </Container>
  );
};

export default CommentArea;

import Avatar from "../../atoms/Avatar";
import CommentTextBox from "../../atoms/CommentTextBox";
import { Container, CommentTextBoxWrapper, Time } from "./styles";

export interface Props {
  comment: {
    id: number;
    content: string;
    user: {
      id: number;
      imageURL: string;
      nickName: string;
      type: string;
    };
    createdAt: string;
  };
  align?: "left" | "right";
}

const Comment = ({ comment, align = "left" }: Props) => {
  return (
    <Container align={align}>
      <Avatar imageURL={comment.user.imageURL} />
      <CommentTextBoxWrapper align={align}>
        <CommentTextBox name="Dobi">{comment.content}</CommentTextBox>
        <Time>{comment.createdAt}</Time>
      </CommentTextBoxWrapper>
    </Container>
  );
};

export default Comment;

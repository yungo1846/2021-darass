import moment from "moment";
import { Comment as CommentType } from "../../../types/comment";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import CheckBox from "../../atoms/CheckBox";
import { Content, ContentMeta, ContentWrapper, Date, Name, Url } from "./styles";

export interface Props {
  isMyComment: boolean;
  isChecked: boolean;
  onChangeCheckBox: () => void;
  authorProfileImageUrl: User["profileImageUrl"];
  authorNickName: User["nickName"];
  createdDate: CommentType["createdDate"];
  content: CommentType["content"];
  url: CommentType["url"];
}

const Comment = ({
  isMyComment,
  isChecked,
  onChangeCheckBox,
  authorProfileImageUrl,
  authorNickName,
  createdDate,
  content,
  url
}: Props) => {
  return (
    <>
      <CheckBox isChecked={isChecked} onChange={onChangeCheckBox} />
      <Avatar imageURL={authorProfileImageUrl} />
      <ContentWrapper>
        <ContentMeta>
          <Name isMyComment={isMyComment}>{authorNickName}</Name>
          <Date>{moment(createdDate).format("YYYY-MM-DD")}</Date>
        </ContentMeta>
        <Content>{content}</Content>
        <Url href={url} target="_blank" rel="noopener noreferrer nofollow">
          {url}
        </Url>
      </ContentWrapper>
    </>
  );
};

export default Comment;

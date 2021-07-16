import { User } from "../../../types/user";
import SubmitButton from "../../atoms/SubmitButton";
import { Form, TextArea, Wrapper, GuestInfo } from "./styles";
import { useInput } from "../../../hooks";
import { FormEvent } from "react";
import { CreateCommentRequestData } from "../../../types/comment";

export interface Props {
  user: User | undefined;
  createComment: (data: CreateCommentRequestData) => Promise<Comment>;
  url: string | null;
  projectSecretKey: string | null;
}

const CommentInput = ({ user, createComment, url, projectSecretKey }: Props) => {
  const { value: content, onChange: onChangeContent, setValue: setContent } = useInput("");
  const { value: guestNickName, onChange: onChangeGuestNickName, setValue: setGuestNickName } = useInput("");
  const { value: guestPassword, onChange: onChangeGuestPassword, setValue: setGuestPassword } = useInput("");

  const isValidFormInput =
    content.length > 0 ? (!user ? guestNickName.length > 0 && guestPassword.length > 0 : true) : false;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const guestInfo = {
      guestNickName: guestNickName || undefined,
      guestPassword: guestPassword || undefined
    };

    createComment({ content, url, projectSecretKey, ...guestInfo });
    setContent("");
    setGuestNickName("");
    setGuestPassword("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea value={content} onChange={onChangeContent} placeholder="댓글을 입력해주세요." />

      <Wrapper>
        {!user && (
          <div>
            <GuestInfo type="text" placeholder="이름" value={guestNickName} onChange={onChangeGuestNickName} />
            <GuestInfo type="password" placeholder="비밀번호" value={guestPassword} onChange={onChangeGuestPassword} />
          </div>
        )}
        <SubmitButton onClick={() => {}} disabled={!isValidFormInput}>
          등록
        </SubmitButton>
      </Wrapper>
    </Form>
  );
};

export default CommentInput;

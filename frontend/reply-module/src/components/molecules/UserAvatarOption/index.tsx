import { ReactNode, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import UserOption from "../../atoms/UserOption";
import { Container, UserOptionWrapper } from "./styles";

export interface Props {
  user: User;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  return (
    <Container>
      <Avatar imageURL={user.imageURL} onClick={onShowOptionBox} />
      {isShowOptionBox && (
        <UserOptionWrapper>
          <UserOption userName={user.nickName}>{children}</UserOption>
        </UserOptionWrapper>
      )}
    </Container>
  );
};

export default UserAvatarOption;

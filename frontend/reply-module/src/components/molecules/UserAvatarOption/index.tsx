import { ReactNode, useState } from "react";
import { User } from "../../../types/user";
import Avatar from "../../atoms/Avatar";
import UserOption from "../../atoms/UserOption";
import { Container, UserOptionWrapper } from "./styles";

export interface Props {
  user?: User;
  children: ReactNode;
}

const UserAvatarOption = ({ user, children }: Props) => {
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const onShowOptionBox = () => {
    setShowOptionBox(state => !state);
  };

  return (
    <Container>
      <Avatar
        imageURL={
          user?.imageURL ||
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726&auto=webp&quality=75"
        }
        onClick={onShowOptionBox}
      />
      {isShowOptionBox && (
        <UserOptionWrapper>
          <UserOption userName={user?.nickName || "Login With"}>{children}</UserOption>
        </UserOptionWrapper>
      )}
    </Container>
  );
};

export default UserAvatarOption;

import { ReactChild } from "react";
import { Container, Label, OptionContainer } from "./styles";

export interface Props {
  userName: string;
  children: ReactChild[];
}

const UserOption = ({ userName, children }: Props) => {
  return (
    <Container>
      <Label>{userName ? userName : "Login with"}</Label>
      <OptionContainer>{children}</OptionContainer>
    </Container>
  );
};

export default UserOption;

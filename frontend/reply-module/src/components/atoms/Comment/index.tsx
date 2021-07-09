import { Container, Name, Text } from "./styles";

export interface Props {
  name: string;
  text: string;
  contentEditable?: boolean;
}

const Comment = ({ name, text, contentEditable = false }: Props) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Text contentEditable={contentEditable}>{text}</Text>
    </Container>
  );
};

export default Comment;

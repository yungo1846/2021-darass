import { postCloseConfirm, postConfirmOK } from "../../../utils/postMessage";
import { Container, Message, ButtonWrapper, ConfirmButton, CancelButton, Modal } from "./styles";

export interface Props {
  message: string;
}

const ConfirmModal = ({ message }: Props) => {
  return (
    <Modal>
      <Container>
        <Message>{message}</Message>
        <ButtonWrapper>
          <ConfirmButton type="button" onClick={postConfirmOK}>
            예
          </ConfirmButton>
          <CancelButton type="button" onClick={postCloseConfirm}>
            아니요
          </CancelButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;

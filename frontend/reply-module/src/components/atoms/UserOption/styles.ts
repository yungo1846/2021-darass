import styled from "styled-components";
import { SpeechBubbleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  ${SpeechBubbleCSS};
  background-color: ${PALETTE.GRAY_200};
  width: 10rem;
  ::before {
    border-bottom: 10px solid ${PALETTE.GRAY_200};
  }
  padding: 0.6rem 0.6rem;
`;

const Label = styled.span`
  align-self: flex-start;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 3px;
  }

  & > *:hover {
    cursor: pointer;
    color: ${PALETTE.BLACK_900};
  }
`;

const ChildrenText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export { Container, Label, OptionContainer, ChildrenText };

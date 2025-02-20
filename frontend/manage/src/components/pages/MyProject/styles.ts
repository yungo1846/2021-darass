import { PALETTE } from "../../../styles/palette";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: relative;
`;

export const AddProjectButton = styled.button`
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0.8rem;
  align-self: flex-end;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.SECONDARY_HOVER};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    margin-bottom: 2rem;
  }
`;

export const Message = styled.span`
  margin-top: 2rem;
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  text-align: center;
`;

import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

const Button = styled.button`
  min-width: 6rem;
  height: 3.6rem;
  background-color: ${PALETTE.PRIMARY};
  color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.7rem 1.6rem;
`;

export { Button };

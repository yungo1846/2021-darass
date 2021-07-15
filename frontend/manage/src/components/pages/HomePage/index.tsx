import { PALETTE } from "../../../styles/palette";
import ScreenContainer from "../../../styles/ScreenContainer";
import Home from "../../templates/Home";

const HomePage = () => {
  return (
    <ScreenContainer bgColor={PALETTE.PRIMARY}>
      <Home />
    </ScreenContainer>
  );
};

export default HomePage;

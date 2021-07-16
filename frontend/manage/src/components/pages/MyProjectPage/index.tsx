import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import useProject from "../../../hooks/useProject";
import MyProject from "../../templates/MyProject";

const MyProjectPage = () => {
  const { projects } = useProject();
  const history = useHistory();

  return (
    <MyProject
      projects={projects}
      moveProjectDetailPage={id => history.push(ROUTE.GET_PROJECT_DETAIL(id))}
      moveNewProjectPage={() => history.push(ROUTE.NEW_PROJECT)}
    />
  );
};

export default MyProjectPage;

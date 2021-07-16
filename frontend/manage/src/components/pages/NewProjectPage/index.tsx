import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useInput } from "../../../hooks";
import useProject from "../../../hooks/useProject";
import NewProject from "../../templates/NewProject";

const NewProjectPage = () => {
  const history = useHistory();
  const { addProject } = useProject();
  const [projectName, onChangeProjectName] = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const project = await addProject(projectName);

    history.push(ROUTE.GET_SCRIPT_PUBLISHING(project.id));
  };

  return <NewProject onSubmit={onSubmit} projectName={projectName} onChangeProjectName={onChangeProjectName} />;
};

export default NewProjectPage;

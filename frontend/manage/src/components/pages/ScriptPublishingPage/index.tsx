import { Redirect, useHistory } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useGetProject } from "../../../hooks";
import ScriptPublishing from "../../templates/ScriptPublishing";

const ScriptPublishingPage = () => {
  const history = useHistory();
  const { project } = useGetProject(1);
  const projectSecretKey = project?.secretKey;

  if (!projectSecretKey) {
    return <Redirect to={ROUTE.MY_PROJECT}></Redirect>;
  }

  return <ScriptPublishing projectSecretKey={projectSecretKey} />;
};

export default ScriptPublishingPage;

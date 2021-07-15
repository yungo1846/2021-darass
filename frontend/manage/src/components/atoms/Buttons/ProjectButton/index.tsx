import { Button } from "./styles";

export interface Props {
  className?: string;
  children?: string;
}

const ProjectButton = ({ className, children }: Props) => {
  return <Button className={className}>{children}</Button>;
};

export default ProjectButton;

import { Story } from "@storybook/react";
import NewProject, { Props } from ".";

export default {
  title: "templates/NewProject",
  component: NewProject,
  argTypes: {}
};

const Template: Story<Props> = args => <NewProject {...args} />;

export const Default = Template.bind({});

Default.args = {
  projects: [
    { id: 1, name: "Github" },
    { id: 2, name: "Tistory" }
  ],
  addProject: () => {},
  moveProjectDetailPage: id => {
    alert(`id: ${id}`);
  }
};

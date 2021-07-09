import { Story } from "@storybook/react";
import Comment, { Props } from ".";

export default {
  title: "atoms/Comment",
  component: Comment,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => <Comment {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: "곤이",
  text: "ㅎㅇㅎㅇ🎃",
  contentEditable: true
};

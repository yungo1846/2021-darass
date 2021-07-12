import { Story } from "@storybook/react";
import UserOption, { Props } from ".";
import { ChildrenText } from "./styles";

export default {
  title: "atoms/UserOption",
  component: UserOption,
  argTypes: { children: { control: "text" } }
};

const Template: Story<Props> = args => (
  <UserOption {...args}>
    <ChildrenText>로그인</ChildrenText>
    <ChildrenText>로그아웃</ChildrenText>
  </UserOption>
);

export const Default = Template.bind({});

Default.args = {};

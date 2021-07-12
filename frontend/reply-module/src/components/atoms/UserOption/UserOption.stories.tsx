import { Story } from "@storybook/react";
import styled from "styled-components";
import UserOption, { Props } from ".";

export default {
  title: "atoms/UserOption",
  component: UserOption,
  argTypes: { children: { control: "text" } }
};

const ChildrenText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Template: Story<Props> = args => (
  <UserOption {...args}>
    <ChildrenText>로그인</ChildrenText>
    <ChildrenText>로그아웃</ChildrenText>
  </UserOption>
);

export const Default = Template.bind({});

Default.args = {};

import React from "react";
import Input from "./Input";

export default {
  title: "components/Form/Input",
  component: Input
};

const Template = args => <Input {...args} />;

// 스토리
export const UserId = Template.bind({});
UserId.args = {
  id: "userid",
  label: "아이디",
  value: "user@email.com",
  placeholder: "아이디로 사용할 이메일을 입력하세요",
};
UserId.storyName = "UserId(Default)";

export const UserIdError = Template.bind({});
UserIdError.args = {
  id: "userid",
  label: "아이디",
  value: "user@email.com",
  placeholder: "아이디로 사용할 이메일을 입력하세요",
  error: "아이디(이메일)는 이메일 형식으로 입력해주세요",
};
UserIdError.storyName = "UserId(Error)";

export const Password = Template.bind({});
Password.args = {
  id: "password",
  label: "패스워드",
  type: "password",
  value: "1234",
  placeholder: "패스워드를 입력하세요",
};
Password.storyName = "Password";

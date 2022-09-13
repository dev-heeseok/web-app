// src/componets/Todo.stories.js
import React from "react";
import Todo from "./Todo";

export default {
  component: Todo,
  title: "components/User/Todo",
};

const Template = (args) => <Todo {...args} />;

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: "1",
    title: "Test Todo",
    state: "TASK_INBOX",
    updatedAt: new Date(2022, 9, 9),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  todo: {
    ...Default.args.todo,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  todo: {
    ...Default.args.todo,
    state: "TASK_ARCHIVED",
  },
};
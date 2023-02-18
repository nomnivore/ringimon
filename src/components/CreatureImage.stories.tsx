import type { StoryFn } from "@storybook/react";
import CreatureImage from "./CreatureImage";

export default {
  title: "Components/CreatureImage",
  component: CreatureImage,
};

const Template: StoryFn<typeof CreatureImage> = (args) => (
  <div className="h-[525px] w-[350px]">
    <CreatureImage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    top: { name: "Whale" },
    mid: { name: "Whale" },
    bot: { name: "Whale" },
  },
};

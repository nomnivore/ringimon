import type { StoryFn } from "@storybook/react";
import CreatureCard from "./CreatureCard";

export default {
  title: "Components/CreatureCard",
  component: CreatureCard,
};

const Template: StoryFn<typeof CreatureCard> = (args) => (
  <CreatureCard {...args} />
);

const baseCreature = {
  fullName: "Topmidbot",
  type: { name: "Inferno" },
  emotion: { name: "Happy" },
  top: { name: "Whale" },
  mid: { name: "Whale" },
  bot: { name: "Whale" },
};

// types are Common, Rare, Legendary, Mythic

export const Common = Template.bind({});
Common.args = {
  creature: {
    ...baseCreature,
    rarityId: 1,
  },
};

export const Rare = Template.bind({});
Rare.args = {
  creature: {
    ...baseCreature,
    rarityId: 2,
  },
};

export const Legendary = Template.bind({});
Legendary.args = {
  creature: {
    ...baseCreature,
    rarityId: 3,
  },
};

export const Mythic = Template.bind({});
Mythic.args = {
  creature: {
    ...baseCreature,
    rarityId: 4,
  },
};

export const WithLongEmotion = Template.bind({});
WithLongEmotion.args = {
  creature: {
    ...baseCreature,
    emotion: { name: "Uncomfortable" },
    rarityId: 2,
    type: { name: "Radiant" },
  },
};

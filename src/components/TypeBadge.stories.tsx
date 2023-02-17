import type { StoryFn } from "@storybook/react";
import React from "react";

import TypeBadge from "./TypeBadge";

export default {
  title: "Components/TypeBadge",
  component: TypeBadge,
};

const Template: StoryFn<typeof TypeBadge> = (args) => <TypeBadge {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Inferno = Template.bind({});
Inferno.args = { type: "Inferno" };

export const Aqua = Template.bind({});
Aqua.args = { type: "Aqua" };

export const Terra = Template.bind({});
Terra.args = { type: "Terra" };

export const Radiant = Template.bind({});
Radiant.args = { type: "Radiant" };

export const Chaos = Template.bind({});
Chaos.args = { type: "Chaos" };

export const Void = Template.bind({});
Void.args = { type: "Void" };

export const Dream = Template.bind({});
Dream.args = { type: "Dream" };

export const Cyber = Template.bind({});
Cyber.args = { type: "Cyber" };

export const Arcane = Template.bind({});
Arcane.args = { type: "Arcane" };

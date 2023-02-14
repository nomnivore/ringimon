import { prisma } from "../db";
import type { Creature } from "@prisma/client";

import { randBetween } from "../../utils/random";

type NameParts = {
  top: { topName: string };
  mid: { midName: string };
  bot: { botName: string };
};

type WithFullName<T> = T & {
  fullName: string;
};

function computeCreatureName<Creature extends NameParts>(
  creature: Creature
): WithFullName<Creature> {
  return {
    ...creature,
    fullName: `${creature.top.topName}${creature.mid.midName}${creature.bot.botName}`,
  };
}

export async function genRandomCreatureProps() {
  const numCreatures = await prisma.baseCreature.count();
  const numEmotions = await prisma.emotion.count();
  const numRarity = await prisma.rarity.count();
  // these could be cached in future
  const numTypes = 2; // zero-indexed

  return {
    // userId omitted from this function
    topId: randBetween(1, numCreatures),
    midId: randBetween(1, numCreatures),
    botId: randBetween(1, numCreatures),
    typeGroupId: randBetween(0, numTypes),
    typeId: randBetween(0, numTypes),
    emotionId: randBetween(1, numEmotions),
    rarityId: randBetween(1, numRarity), // should be adjusted to a weighted-random system
  };
}

export async function createCreature(userId: string | null) {
  return prisma.creature.create({
    data: {
      userId,
      ...(await genRandomCreatureProps()),
    },
  });
}

const creatureIncludes = {
  top: { select: { topName: true, name: true } },
  mid: { select: { midName: true, name: true } },
  bot: { select: { botName: true, name: true } },
  type: { select: { name: true } },
  emotion: true,
  rarity: { select: { name: true } },
};

export async function getCreatureById(creatureId: string) {
  // TODO: include part image urls somewhere in this model
  const creature = await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
    include: creatureIncludes,
  });

  return creature ? computeCreatureName(creature) : null;
}

export async function getCreaturesByUserId(userId: string) {
  const creatures = await prisma.creature.findMany({
    where: {
      userId: userId,
    },
    include: creatureIncludes,
  });

  return creatures.map(computeCreatureName);
}

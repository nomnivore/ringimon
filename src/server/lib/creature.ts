import { prisma } from "../db";

import { randBetween } from "../../utils/random";

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

export async function getCreatureById(creatureId: string) {
  return await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
    include: {
      top: { select: { topName: true, name: true } },
      mid: { select: { midName: true, name: true } },
      bot: { select: { botName: true, name: true } },
      type: { select: { name: true } },
      emotion: { select: { name: true } },
      rarity: { select: { name: true } },
    },
  });
}

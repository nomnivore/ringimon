import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const generatorRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx: { prisma, session } }) => {
    const newCreature = await prisma.creature.create({
      data: {
        userId: session.user.id,
        topId: 1,
        midId: 2,
        botId: 4,
        essenceId: 5,
        typeGroupId: 1,
        typeId: 2,

        emotionId: 6,
        rarityId: 2,
      },
    });

    return await prisma.creature.findUnique({
      where: {
        id: newCreature.id,
      },
      include: {
        top: { select: { topName: true, name: true } },
        mid: { select: { midName: true, name: true } },
        bot: { select: { botName: true, name: true } },
        essence: { select: { name: true } },
        type: { select: { name: true } },
        emotion: { select: { name: true } },
        rarity: { select: { name: true } },
      },
    });
  }),
});

import { createCreature, getCreatureById } from "../../lib/creature";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const generatorRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    const newCreature = await createCreature(session.user.id);

    return await getCreatureById(newCreature.id);
  }),
});

import {
  createCreature,
  getCreatureById,
  getCreaturesByUserId,
} from "../../lib/creature";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const creatureRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    const newCreature = await createCreature(session.user.id);

    return await getCreatureById(newCreature.id);
  }),
  getUserCreatures: protectedProcedure.query(async ({ ctx: { session } }) => {
    return await getCreaturesByUserId(session.user.id);
  }),
});

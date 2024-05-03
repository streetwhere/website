import { z } from "zod";
import * as _ from "radash";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const testRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(async ({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
});

import { z } from "zod";
import * as _ from "radash";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const testRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(async ({ input }) => {
			await _.sleep(5000);

			return {
				greeting: `Hello ${input.text}`,
			};
		}),
});

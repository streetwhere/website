import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { shops } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const shopRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				to: z
					.string({ required_error: 'To email is required!' })
					.min(1, 'To email is required!')
					.email('To is not a valid email!'),
				name: z
					.string({ required_error: 'Shopname is required!' })
					.min(1, 'Shopname is required!')
					.max(32, 'Shopname can at most be 32 charachters long!'),
				desc: z.string().nullable().default(null),
				url: z
					.string({ required_error: 'Link of shop is required!' })
					.url('Link of shop is not a valid url!'),
				location: z
					.string({ required_error: 'Shop location is required!' })
					.min(1, 'Shop location is required!'),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(shops).values({
				...input,
				name: input.name.toLowerCase(),
			})
		}),
	get: protectedProcedure
		.input(
			z.object({
				name: z
					.string({
						required_error: 'Name of shop is required!',
					})
					.min(1, 'Name of the shop is required!')
					.max(32, 'Shopname can at most be 32 charachters long!'),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.db
				.select()
				.from(shops)
				.where(eq(shops.name, input.name.toLowerCase()))
		}),
	list: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(shops)
	}),
})

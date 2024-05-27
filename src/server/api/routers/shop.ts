import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { shop as SHOP } from '@/server/db/schema'
import { env } from '@/utils'
import { eq } from 'drizzle-orm'
import { v5 as uuidv5 } from 'uuid'
import { z } from 'zod'

export const shopRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
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
			const [email, domain] = env.IMAP_USERNAME.split('@')

			const to = `${email}+${hash(input.name)}@${domain}`

			await ctx.db.insert(SHOP).values({
				...input,
				to: to,
				name: input.name.toLowerCase(),
			})

			return {
				success: true,
				to,
				name: input.name,
			}
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
				.from(SHOP)
				.where(eq(SHOP.name, input.name.toLowerCase()))
		}),
	list: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(SHOP)
	}),
})

function hash(name: string): string {
	const nameSpace = '1b671a64-40d5-491e-99b0-da01ff1f3341'
	const hashedStr = uuidv5(name, nameSpace).substring(0, 8)
	return hashedStr
}

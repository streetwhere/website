import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { mail as MAIL, shop as SHOP } from '@/server/db/schema'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const mailRouter = createTRPCRouter({
	get: protectedProcedure
		.input(
			z.object({
				to: z
					.string({
						required_error: 'Recipent of mail is required!',
					})
					.min(1, 'Recipent of mail is required!')
					.max(
						256,
						'Recipent of mail can at most be 256 charachters long!',
					),
			}),
		)
		.query(async ({ ctx, input }) => {
			const [shop] = await ctx.db
				.select({ id: SHOP.id })
				.from(SHOP)
				.where(eq(SHOP.to, input.to.toLowerCase()))

			if (!shop)
				throw new TRPCError({
					message: 'Recipent email is not valid for any shop',
					code: 'BAD_REQUEST',
				})

			return ctx.db.select().from(MAIL).where(eq(MAIL.shopId, shop.id))
		}),
	list: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(MAIL)
	}),
})

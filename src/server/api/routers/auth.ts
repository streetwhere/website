import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'
import { lucia } from '@/server/auth'
import { users } from '@/server/db/schema'
import { compare, hash } from '@/server/password'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const authRouter = createTRPCRouter({
	signUp: publicProcedure
		.input(
			z.object({
				username: z
					.string({ required_error: 'Username is required!' })
					.min(1, 'Username is required!')
					.min(3, 'Username must be atleast 3 charachters long!')
					.max(24, 'Username can be atmost 24 charachters long!')
					.regex(
						/^[a-zA-Z0-9_-]+$/g,
						'Username is not valid! (a-z, 0-9, - and _)',
					),
				email: z
					.string({ required_error: 'Email is required!' })
					.email('Email is not valid!'),
				password: z
					.string({ required_error: 'Password is required!' })
					.min(1, 'Password is required!')
					.min(8, 'Password must be atleast 8 charachters long!')
					.max(32, 'Password can be atmost than 32 charachters!'),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const passwordHash = await hash(input.password)

			try {
				await ctx.db.insert(users).values({
					username: input.username.toLowerCase(),
					email: input.email.toLowerCase(),
					password: passwordHash,
				})
			} catch (error) {
				throw new TRPCError({
					message: "Couldn't create new user: " + error,
					code: 'CONFLICT',
				})
			}
		}),
	signIn: publicProcedure
		.input(
			z.object({
				username: z
					.string({ required_error: 'Username is required!' })
					.min(1, 'Username is required!')
					.min(3, 'Username must be atleast 3 charachters long!')
					.max(24, 'Username can be atmost 24 charachters long!')
					.regex(
						/^[a-zA-Z0-9_-]+$/g,
						'Username should only container valid charachters (a-z, 0-9, - and _)',
					),
				password: z
					.string({ required_error: 'Password is required!' })
					.min(1, 'Password is required!')
					.min(8, 'Password must be atleast 8 charachters long!')
					.max(32, 'Password can be atmost than 32 charachters!'),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [user] = await ctx.db
				.select()
				.from(users)
				.where(eq(users.username, input.username.toLowerCase()))

			if (!user)
				throw new TRPCError({
					message: 'Username or Password are incorrect!',
					code: 'BAD_REQUEST',
				})

			if (!(await compare(input.password, user.password)))
				throw new TRPCError({
					message: 'Username or Password are incorrect!',
					code: 'BAD_REQUEST',
				})

			const session = await lucia.createSession(user.id.toString(), {})
			return lucia.createSessionCookie(session.id)
		}),
	signOut: protectedProcedure.mutation(async ({ ctx }) => {
		const { session, user } = ctx.auth

		if (!session)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
			})

		await lucia.invalidateUserSessions(user.id)
		return lucia.createBlankSessionCookie()
	}),
})

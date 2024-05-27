import { luciaAdapter } from '@/server/db/index'
import { Lucia, TimeSpan } from 'lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Session, User } from 'lucia'
import type { user } from './db/schema'

export const lucia = new Lucia(luciaAdapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: ({ email, username, fullname, pfp, role }) => {
		return {
			email,
			username,
			fullname,
			pfp,
			role,
		}
	},

	sessionExpiresIn: new TimeSpan(2, 'w'),
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		UserId: number
		DatabaseUserAttributes: typeof user.$inferSelect
	}
}

export const useUser = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

		if (!sessionId) {
			return {
				user: null,
				session: null,
			}
		}

		const result = await lucia.validateSession(sessionId)
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session?.fresh) {
				const sessionCookie = lucia.createSessionCookie(
					result.session.id,
				)

				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				)
			}

			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie()
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				)
			}
			// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
		} catch {}

		return result
	},
)

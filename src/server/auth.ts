import { luciaAdapter } from '@/server/db/index'
import { Lucia, TimeSpan } from 'lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Session, User } from 'lucia'

export const lucia = new Lucia(luciaAdapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
		}
	},

	sessionExpiresIn: new TimeSpan(2, 'w'),
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	username: string
}

export const validateRequest = cache(
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

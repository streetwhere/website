'use server'

import type { Cookie } from 'lucia'
import { cookies } from 'next/headers'

export async function setCookie(cookie: Cookie) {
	cookies().set(cookie.name, cookie.value, cookie.attributes)
}

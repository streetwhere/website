import { useUser } from '@/server/auth'
import type { PropsWithChildren, ReactNode } from 'react'
import Header from '../_components/Header'

export default async function RootLayout({
	children,
}: PropsWithChildren<{ mails: ReactNode }>) {
	const { user } = await useUser()

	return (
		<div id="root" className="flex flex-col min-h-screen">
			<Header user={user} />

			<main className="flex flex-col px-5 pt-5 mx-auto w-full max-w-screen-xl grow">
				{children}
			</main>
		</div>
	)
}

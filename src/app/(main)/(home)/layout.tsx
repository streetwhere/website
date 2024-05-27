import type { PropsWithChildren, ReactNode } from 'react'

export default function HomeLayout({
	mails,
}: PropsWithChildren<{ mails: ReactNode }>) {
	return <>{mails}</>
}

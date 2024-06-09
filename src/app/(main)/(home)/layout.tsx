import type { PropsWithChildren, ReactNode } from 'react'

export default function HomeLayout({
	mails,
	stores,
}: PropsWithChildren<{ mails: ReactNode; stores: ReactNode }>) {
	return (
		<div className="flex flex-col">
			{mails} {stores}
		</div>
	)
}

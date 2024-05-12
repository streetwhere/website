'use client'

import type { mails } from '@/server/db/schema'
import { Virtuoso } from 'react-virtuoso'

interface MailProps {
	mails: (typeof mails.$inferSelect)[]
}

export default function MailList({ mails }: MailProps) {
	return (
		<Virtuoso
			className="grow"
			data={mails}
			itemContent={(i, data) => (
				<div>
					Item {i} | {data.subject}
				</div>
			)}
		/>
	)
}

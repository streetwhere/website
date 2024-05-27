'use client'

import type { mail } from '@/server/db/schema'
import { Virtuoso } from 'react-virtuoso'

interface MailProps {
	mails: (typeof mail.$inferSelect)[]
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

import { api } from '@/trpc/server'
import MailList from './MailList'

export default async function Mails() {
	const mails = await api.mail.list()

	return (
		<>
			<span className="text-4xl font-medium font-title">
				Latest Drops
			</span>

			<MailList mails={mails} />
		</>
	)
}

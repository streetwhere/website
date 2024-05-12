import { api } from '@/trpc/server'
import MailList from './MailList'

export default async function Mails() {
	const mails = await api.mail.list()

	return <MailList mails={mails} />
}

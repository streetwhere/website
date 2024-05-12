import { env } from '@/utils'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const GET = async (req: NextRequest): Promise<Response> => {
	const secret = req.headers.get('x-mail-hook-secret')

	if (!secret || secret !== env.IMAP_WEBHOOK_SECRET)
		return new Response('Unauthorized')

	console.log('NEW MAILS')
	// TODO: GET NEW EMAILS AND SEND NOTIFICAIONTS

	return NextResponse.json({ status: 'ok' })
}

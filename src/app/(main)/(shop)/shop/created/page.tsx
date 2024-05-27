'use client'

import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/app/_components/ui/accordion'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AccordionItem } from '@radix-ui/react-accordion'
import { Check, Clipboard } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ShopCreated() {
	const [copied, setCopied] = useState(false)
	const [clipboardRef] = useAutoAnimate()

	const params = useSearchParams()

	const email = params.get('email')
	const name = params.get('name')

	if (!email || !name) return 'Not found'

	async function copyToClipboard(email: string) {
		await navigator.clipboard.writeText(email)

		setCopied(true)
		toast.success('Copied to clipboard')

		setTimeout(() => setCopied(false), 3000)
	}

	return (
		<div className="flex flex-col gap-7">
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<Input value={email} readOnly />
					<Button
						variant="outline"
						ref={clipboardRef}
						onClick={() => copyToClipboard(email)}
					>
						{copied ? (
							<Check className="w-5 h-5" />
						) : (
							<Clipboard className="w-5 h-5" />
						)}
					</Button>
				</div>
			</div>

			<Accordion type="single" collapsible>
				<AccordionItem value="next-steps">
					<AccordionTrigger>
						What are the next steps?
					</AccordionTrigger>
					<AccordionContent className="text-white/70" asChild>
						<ol className="list-decimal list-inside">
							<li>
								Copy and enlist the given mail in the shops
								newsletter
							</li>

							<br />

							<li>
								Finally you wait for your store to be approved.
							</li>

							<br />

							<li>
								After the approval you can add more information
								and view the incoming mails.
							</li>
						</ol>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

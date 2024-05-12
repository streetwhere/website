import { Button } from '@/app/_components/ui/button'
import { CornerDownLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function AccountsLayout({ children }: PropsWithChildren) {
	return (
		<div id="root" className="flex flex-col min-h-screen">
			<div
				role="navigation"
				className="flex items-center justify-between h-16 px-5 py-2 border-b"
			>
				<Link href="/" className="flex items-center gap-2">
					<Image
						src={'/icon.png'}
						width={25}
						height={25}
						alt="logo"
					/>
					<span className="font-extrabold text">streetwhere?</span>
				</Link>

				<Button className="w-min" variant="ghost" asChild>
					<Link href={'/'} className="flex items-center gap-2 m-2">
						<CornerDownLeft className="w-4 h-4" />
						<span>Return</span>
					</Link>
				</Button>
			</div>

			<main className="flex items-center justify-center max-w-screen-lg pb-16 grow">
				{children}
			</main>
		</div>
	)
}

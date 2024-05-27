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
				className="flex justify-between items-center py-2 px-5 h-16 border-b"
			>
				<Link href="/" className="flex gap-2 items-center">
					<Image
						src={'/icon.png'}
						width={25}
						height={25}
						alt="logo"
					/>
					<span className="font-extrabold text">streetwhere?</span>
				</Link>

				<Button className="w-min" variant="ghost" asChild>
					<Link href={'/'} className="flex gap-2 items-center m-2">
						<CornerDownLeft className="w-4 h-4" />
						<span>Return</span>
					</Link>
				</Button>
			</div>

			<main className="flex justify-center items-center pb-16 mx-auto w-full max-w-screen-lg grow">
				{children}
			</main>
		</div>
	)
}

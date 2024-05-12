import icon from '@/app/_components/streetwhere/icon.png'
import { Button } from '@/app/_components/ui/button'
import { validateRequest } from '@/server/auth'
import Image from 'next/image'
import Link from 'next/link'
import type { PropsWithChildren, ReactNode } from 'react'
import AccountDropdown from './AccountDropdown'

export default async function RootLayout({
	children,
	mails,
}: PropsWithChildren<{ mails: ReactNode }>) {
	const { user } = await validateRequest()

	return (
		<div id="root" className="flex flex-col min-h-screen">
			<div
				role="navigation"
				className="flex items-center justify-between h-16 px-5 py-2 border-b"
			>
				<Link href="/" className="flex items-center gap-2">
					<Image
						src={icon}
						width={35}
						height={35}
						priority={true}
						loading="eager"
						alt="logo"
						className="w-7 h-7"
					/>
					<div className="flex flex-col">
						<span className="font-bold font-logo text-base leading-snug">
							streetwhere?
						</span>
						<span className="font-mono font-light leading-none text-[0.57rem]">
							[BETA]
						</span>
					</div>
				</Link>

				<div>
					{user ? (
						<div>
							<AccountDropdown user={user} />
						</div>
					) : (
						<div className="flex items-center justify-between gap-5">
							<Button
								className="w-min"
								variant="secondary"
								asChild
							>
								<Link href={'/a/signin'}>
									<span className="text-xs">Sign in</span>
								</Link>
							</Button>

							<Button className="w-min" asChild>
								<Link href={'/a/signup'}>
									<span className="text-xs">Sign up</span>
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>

			<main className="pt-5 px-2 grow flex flex-col">
				{children} {mails}
			</main>
		</div>
	)
}

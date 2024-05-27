import icon from '@/app/_components/streetwhere/icon.png'
import type { User } from 'lucia'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AccountDropdown from './AccountDropdown'
import NavMenu from './NavMenu'
import { Button } from './ui/button'

export default function Header({ user }: { user: User | null }) {
	return (
		<div role="navigation" className="border-b">
			<div className="flex justify-between items-center py-2 px-5 mx-auto w-full max-w-screen-xl h-16">
				<Link href="/" className="flex gap-2 items-center">
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
						<span className="text-base font-medium tracking-wide leading-snug font-title">
							streetwhere?
						</span>
						<span className="font-mono font-light tracking-tighter leading-none text-[0.57rem]">
							[BETA]
						</span>
					</div>
				</Link>

				<div>
					{user ? (
						<div className="flex gap-5 items-center">
							<Button
								className="flex gap-2 items-center w-min h-fit"
								variant="default"
								asChild
							>
								<Link href={'/shop/create'}>
									<Plus className="w-4 h-4" />
									<span className="text-xs">Add Store</span>
								</Link>
							</Button>

							<NavMenu />

							<AccountDropdown user={user} />
						</div>
					) : (
						<div className="flex gap-5 justify-between items-center">
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
		</div>
	)
}

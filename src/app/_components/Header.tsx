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
			<div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-5 py-2">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src={icon}
						width={35}
						height={35}
						priority={true}
						loading="eager"
						alt="logo"
						className="h-7 w-7"
					/>
					<div className="flex flex-col">
						<span className="font-title text-base font-medium leading-snug tracking-wide">
							streetwhere?
						</span>
						<span className="font-mono text-[0.57rem] font-light leading-none tracking-tighter">
							[BETA]
						</span>
					</div>
				</Link>

				<div>
					{user ? (
						<div className="flex items-center gap-5">
							<Button
								className="flex h-fit w-min items-center gap-2"
								variant="default"
								asChild
							>
								<Link href={'/shop/create'}>
									<Plus className="h-4 w-4" />
									<span className="text-xs">Add Store</span>
								</Link>
							</Button>

							<NavMenu />

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
		</div>
	)
}

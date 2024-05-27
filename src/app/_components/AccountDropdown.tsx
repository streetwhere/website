'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/app/_components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { api } from '@/trpc/react'
import type { User } from 'lucia'
import { Download, HeartHandshake, LifeBuoy, LogOut, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AccountDropdown({ user }: { user: User }) {
	const router = useRouter()

	const { mutate } = api.auth.signOut.useMutation({
		onSuccess: () => router.refresh(),
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="w-7 h-7 ring-white ring-offset-2 ring-[1.5px] ring-offset-background">
					<AvatarImage asChild></AvatarImage>
					<AvatarFallback className="bg-background" delayMs={0}>
						<Image
							src={`/pfps/${user.pfp}.jpg`}
							priority={true}
							quality={80}
							width={30}
							height={30}
							loading="eager"
							alt="carti | pfp"
						/>
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="mt-2 min-w-56">
				<DropdownMenuLabel className="flex gap-3 items-center">
					<Avatar className="w-8 h-8 ring-white ring-offset-2 ring-[1.5px] ring-offset-background">
						<AvatarImage />
						<AvatarFallback className="bg-background" delayMs={0}>
							<Image
								src={`/pfps/${user.pfp}.jpg`}
								quality={80}
								width={35}
								height={35}
								alt="carti | pfp"
							/>
						</AvatarFallback>
					</Avatar>
					<div className="text-base">
						<span className="font-normal">@</span>

						<span className="text-">{user.username}</span>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="flex gap-2 text-sm cursor-pointer"
					asChild
				>
					<Link href={`/u/${user.username}`}>
						<User2 className="w-4 h-4" />
						<span>My Account</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="flex gap-2 text-sm cursor-pointer"
					asChild
				>
					<Link href={'/docs/how-to-install'}>
						<Download className="w-4 h-4" />
						<span>How to install?</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="flex gap-2 text-sm cursor-pointer"
					asChild
				>
					<Link href={'/shop/new'}>
						<LifeBuoy className="w-4 h-4" />
						<span>FAQ & Support</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex gap-2 text-sm cursor-pointer"
					asChild
				>
					<Link href={'/shop/new'}>
						<HeartHandshake className="w-4 h-4" />
						<span>Give Feedback</span>
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => mutate()}
					className="flex gap-2 text-sm cursor-pointer hover:!bg-red-400/20"
				>
					<LogOut className="w-4 h-4" />
					<span>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

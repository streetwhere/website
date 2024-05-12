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
import type { User } from 'lucia'
import { Cog, Info, LogOut, Search, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Header({ user }: { user: User | null }) {
	return (
		<div
			role="navigation"
			className="flex items-center justify-between w-full p-2 mx-auto text-xs max-w-screen-xl"
		>
			<Link href="/" className="flex items-center gap-2">
				<Image src={'/icon.png'} width={25} height={25} alt="logo" />
				<span className="text-sm font-extrabold">streetwhere?</span>
			</Link>

			<div className="flex items-center justify-center grow gap-5">
				<Link href={'/brands'}>brands</Link>

				<span className="text-lg opacity-50">·</span>

				<Link href={'/styles'}>styles</Link>

				<span className="text-lg opacity-50">·</span>

				<Link href={'/reviews'}>reviews</Link>

				<span className="text-lg opacity-50">·</span>

				<Link href={'/trends'}>trends</Link>

				<span className="text-lg opacity-50">·</span>

				<Link href={'/schedule'}>schedule</Link>
			</div>

			<div className="flex">
				<Button variant="link" className="px-2 py-1">
					<Search className="w-6 h-6" />
				</Button>
				{!user ? (
					<Button>Sign Up</Button>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="w-6 h-6 border-2 border-gray-100">
								<AvatarImage src="" />
								<AvatarFallback className="bg-gray-900">
									{user.username[0]}
									{user.username[1]}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-56">
							<DropdownMenuLabel className="flex items-center gap-2">
								<Avatar className="w-6 h-6 border-2 border-gray-100">
									<AvatarImage src="" />
									<AvatarFallback className="bg-gray-900">
										{user.username[0]}
										{user.username[1]}
									</AvatarFallback>
								</Avatar>
								@{user.username}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link
									className="flex items-center w-full h-full gap-3"
									href={`/u/${user.username}`}
								>
									<UserIcon className="w-5 h-5" />
									My profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex items-center gap-3">
								<Cog className="w-5 h-5" />
								Account settings
							</DropdownMenuItem>
							<DropdownMenuItem className="flex items-center gap-3 opacity-85">
								<Info className="w-5 h-5" />
								Help
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								color="red"
								className="flex items-center gap-3 !text-destructive/80 hover:!text-destructive hover:!bg-destructive/30"
							>
								<LogOut className="w-5 h-5" />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}

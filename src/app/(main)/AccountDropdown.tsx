'use client'

import cartiPfp from '@/app/_components/pfps/carti.jpg'
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
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AccountDropdown({ user }: { user: User }) {
	const router = useRouter()

	const { mutate } = api.auth.signOut.useMutation({
		onSuccess: () => router.refresh(),
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="w-7 h-7 ring-[1.5px] ring-offset-2 ring-offset-background ring-white">
					<AvatarImage asChild></AvatarImage>
					<AvatarFallback className="bg-background" delayMs={0}>
						<Image
							src={cartiPfp}
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
			<DropdownMenuContent align="end" className="min-w-56">
				<DropdownMenuLabel className="flex items-center gap-3">
					<Avatar className="w-8 h-8 ring-[1.5px] ring-offset-2 ring-offset-background ring-white">
						<AvatarImage />
						<AvatarFallback className="bg-background" delayMs={0}>
							<Image
								src={cartiPfp}
								quality={80}
								width={35}
								height={35}
								alt="carti | pfp"
							/>
						</AvatarFallback>
					</Avatar>
					<span className="text-base">
						<span className="font-normal">@</span>

						{user.username}
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => mutate()}
					className="flex gap-2 cursor-pointer text-sm"
				>
					<LogOut className="w-4 h-4" />
					<span className="text-sm">Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

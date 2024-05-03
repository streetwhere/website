"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Cog, Info, LogOut, QrCode, Search, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default async function Header(props, ctx) {
	console.log(props, ctx);
	return (
		<div
			role="navigation"
			className="flex justify-between items-center max-w-screen-xl mx-auto w-full p-2"
		>
			<Link href="/" className="flex items-center gap-2">
				<Image src={"/icon.png"} width={25} height={25} alt="logo" />
				<span className="font-extrabold">streetwhere?</span>
			</Link>

			<div className="grow flex justify-center gap-5 items-center">
				<Link href={"/brands"}>brands</Link>
				<span className="opacity-50 text-lg">·</span>
				<Link href={"/styles"}>styles</Link>
				<span className="opacity-50 text-lg">·</span>
				<Link href={"/reviews"}>reviews</Link>
				<span className="opacity-50 text-lg">·</span>
				<Link href={"/trends"}>trends</Link>
				<span className="opacity-50 text-lg">·</span>
				<Link href={"/schedule"}>schedule</Link>
			</div>

			<div className="flex">
				<Button variant="link" className="py-1 px-2">
					<Search className="h-6 w-6" />
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className="w-6 h-6 border-2 border-gray-100">
							<AvatarImage src="https://www.apple.com/favicon.ico" />
							<AvatarFallback className="bg-gray-900">
								<User className="p-0.5" />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-56">
						<DropdownMenuLabel className="flex items-center gap-2">
							<Avatar className="w-6 h-6 border-2 border-gray-100">
								<AvatarImage src="https://www.apple.com/favicon.ico" />
								<AvatarFallback className="bg-gray-900">
									<User className="p-0.5" />
								</AvatarFallback>
							</Avatar>
							@Username
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center gap-3">
							<User className="h-5 w-5" />
							My profile
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-3">
							<Cog className="h-5 w-5" />
							Account settings
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-3 opacity-85">
							<Info className="h-5 w-5" />
							Help
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							color="red"
							className="flex items-center gap-3 !text-destructive/80 hover:!text-destructive hover:!bg-destructive/30"
						>
							<LogOut className="h-5 w-5" />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

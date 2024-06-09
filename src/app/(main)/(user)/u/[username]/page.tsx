import { useUser } from '@/server/auth'
import Image from 'next/image'

export default async function UserPage() {
	const { user } = await useUser()

	return (
		<div>
			<div className="flex py-10">
				<div className="flex-1">
					<Image
						src={`/pfps/${user?.pfp}.jpg`}
						alt="User"
						width={224}
						height={224}
						className="h-56 w-56 rounded-full ring-2 ring-white ring-offset-2 ring-offset-background"
					/>
				</div>

				<div className="flex-[2]">
					<div className="flex items-center gap-2">
						<span className="font-title text-3xl">
							@{user?.username}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

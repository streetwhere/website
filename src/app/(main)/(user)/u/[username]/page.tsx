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
						className="w-56 h-56 rounded-full ring-2 ring-white ring-offset-2 ring-offset-background"
					/>
				</div>

				<div className="flex-[2]">
					<div className="flex gap-2 items-center">
						<span className="text-3xl font-title">
							@{user?.username}
						</span>

						<div className="h-8 border-l-[2px]"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

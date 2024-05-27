import type { PropsWithChildren } from 'react'

export default function ShopCreateLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex justify-center items-center mb-40 grow">
			<div className="flex flex-col gap-12 mx-auto w-full max-w-lg">
				<div className="flex flex-col gap-2">
					<span className="text-4xl font-title">
						Shop created successfully
					</span>
					<span className="text-xs font-light text-white/50">
						Before you can recieve mails from your shop it must
						first be approved by an admin.
					</span>
				</div>

				<div className="mb-16">{children}</div>
			</div>
		</div>
	)
}

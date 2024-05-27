import type { PropsWithChildren } from 'react'

export default function ShopCreateLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex justify-center items-center mb-40 grow">
			<div className="flex flex-col gap-12 mx-auto w-full max-w-lg">
				<div className="flex flex-col gap-2">
					<span className="text-4xl font-title">Add a new shop</span>
					<span className="text-xs font-light text-white/50">
						Please enter the information below to successfully add a
						new shop. After the creation you will be able to add
						more information.
					</span>
				</div>

				<div>{children}</div>
			</div>
		</div>
	)
}

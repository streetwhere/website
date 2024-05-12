import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function SignUpLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col max-w-md gap-10 grow">
			<div className="flex flex-col">
				<h1 className="text-4xl font-bold">Create an account</h1>
				<span className="text-sm opacity-70">
					Please enter yout details to sign up.
				</span>
			</div>
			<div>{children}</div>

			<span className="text-sm text-center opacity-70">
				Already have an account?{' '}
				<Link className="underline" href="/a/signin">
					Sign in here.
				</Link>
			</span>
		</div>
	)
}

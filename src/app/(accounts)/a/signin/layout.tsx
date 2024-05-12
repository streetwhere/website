import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function SignInLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col max-w-md gap-10 grow">
			<div className="flex flex-col">
				<h1 className="text-4xl font-bold">Welcome Back!</h1>
				<span className="text-sm opacity-70">
					Please enter yout details to sign in.
				</span>
			</div>

			<div>{children}</div>

			<span className="text-sm text-center opacity-70">
				Dont have an account yet?{' '}
				<Link className="underline" href="/a/signup">
					Sign up here.
				</Link>
			</span>
		</div>
	)
}

'use client'

import { Button } from '@/app/_components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { setCookie } from '../cookie-action'

const FORM_SCHEMA = z.object({
	username: z
		.string({ required_error: 'Username is required!' })
		.min(1, 'Username is required!')
		.min(3, 'Username must be atleast 3 charachters long!')
		.max(24, 'Username can be atmost 24 charachters long!')
		.regex(
			/^[a-zA-Z0-9_-]+$/g,
			'Username should only container valid charachters (a-z, 0-9, - and _)',
		),
	password: z
		.string({ required_error: 'Password is required!' })
		.min(1, 'Password is required!')
		.min(8, 'Password must be atleast 8 charachters long!')
		.max(32, 'Password can be atmost than 32 charachters!'),
})

export default function SignInForm() {
	const router = useRouter()
	const form = useForm<z.infer<typeof FORM_SCHEMA>>({
		resolver: zodResolver(FORM_SCHEMA),
	})

	const { mutate } = api.auth.signIn.useMutation({
		onSuccess: (data) => {
			setCookie(data)
			router.push('/')
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => mutate(v))}
				className="flex flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="streetwhere-" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="********"
									type="password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant="link" className="p-0 w-min" asChild>
					<Link
						className="text-xs -mb-7 opacity-70"
						href={'/authenticate/reset-password'}
					>
						Forgot password?
					</Link>
				</Button>

				<Button className="w-full mt-0" type="submit">
					Continue
				</Button>
			</form>
		</Form>
	)
}

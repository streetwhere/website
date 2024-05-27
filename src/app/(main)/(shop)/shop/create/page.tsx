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
import { Textarea } from '@/app/_components/ui/textarea'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const FORM_SCHEMA = z.object({
	name: z
		.string({ required_error: 'Shopname is required!' })
		.min(1, 'Shopname is required!')
		.max(32, 'Shopname can at most be 32 charachters long!'),
	desc: z.string().default(''),
	url: z
		.string({ required_error: 'Link of shop is required!' })
		.url('Link of shop is not a valid url!'),
	location: z
		.string({ required_error: 'Shop location is required!' })
		.min(1, 'Shop location is required!'),
})

export default function ShopCreate() {
	const router = useRouter()
	const form = useForm<z.infer<typeof FORM_SCHEMA>>({
		resolver: zodResolver(FORM_SCHEMA),
	})

	const { mutateAsync } = api.shop.create.useMutation()

	async function submit(input: {
		name: string
		url: string
		desc: string
		location: string
	}) {
		const res = await toast.promise(mutateAsync(input), {
			loading: 'Creating new shop...',
			success: 'Shop created successfully',
			error: 'Failed to create shop',
		})

		const name = encodeURIComponent(res.name)
		const to = encodeURIComponent(res.to)

		if (res.success) {
			router.push(`/shop/created?email=${to}&name=${name}`)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submit)}
				className="flex flex-col gap-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Adidas" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Website</FormLabel>
							<FormControl>
								<Input
									placeholder="https://www.adidas.com"
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location</FormLabel>
							<FormControl>
								<Input
									placeholder="Berlin, Germany"
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Adidas sells products like shoes, clothing, and accessories."
									rows={6}
									className="resize-none"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="mt-5 w-full" type="submit">
					Continue
				</Button>
			</form>
		</Form>
	)
}

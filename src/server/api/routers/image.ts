import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { z } from 'zod'

const IMAGE_SCHEMA = z.object({
	name: z.string().min(1),
	url: z.string().url(),
})

export const imageRouter = createTRPCRouter({
	change: protectedProcedure
		.input(
			z.object({
				new: IMAGE_SCHEMA,
				old: IMAGE_SCHEMA,
				id: z.number().min(1),
			}),
		)
		.mutation(async () => {
			return {}
		}),
	remove: protectedProcedure
		.input(
			z.object({
				name: z
					.string({
						required_error: 'Name of the image is required!',
					})
					.min(1, 'Name of the image is required!'),
			}),
		)
		.mutation(async () => {
			return {}
		}),
})

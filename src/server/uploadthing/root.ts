import { validateRequest } from '@/server/auth'
import { type FileRouter, createUploadthing } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const imageRouter = {
	uploadProfilePicture: f({ image: { maxFileSize: '1MB', maxFileCount: 1 } })
		.middleware(authenticate)
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId)

			console.log('file url', file)

			return { uploadedBy: metadata.userId }
		}),
} satisfies FileRouter

async function authenticate() {
	const { user } = await validateRequest()

	if (!user) throw new UploadThingError('Unauthorized')

	return { userId: user.id }
}

export type ImageRouter = typeof imageRouter

import { generateReactHelpers } from '@uploadthing/react'

import type { ImageRouter } from '@/server/uploadthing/root'

export const { useUploadThing, uploadFiles } =
	generateReactHelpers<ImageRouter>()

import { createRouteHandler } from 'uploadthing/next'

import { imageRouter } from '@/server/uploadthing/root'
import { env } from '@/utils'

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: imageRouter,

	config: {
		uploadthingId: env.UPLOADTHING_APP_ID,
		uploadthingSecret: env.UPLOADTHING_SECRET,
	},
})

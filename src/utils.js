import { createEnv } from '@t3-oss/env-nextjs'
import * as _ from 'radash'
import { z } from 'zod'

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		DATABASE_URL: z.string().url(),
		UPLOADTHING_APP_ID: z.string().min(1),
		UPLOADTHING_SECRET: z.string().min(1),
		IMAP_WEBHOOK_SECRET: z.string().min(1),
		VERCEL_URL: z.string().nullable().default(null),
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
		VERCEL_URL: process.env.VERCEL_URL,
		IMAP_WEBHOOK_SECRET: process.env.IMAP_WEBHOOK_SECRET,
		NODE_ENV: process.env.NODE_ENV,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
	 * `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
})

/**
 * @callback NextConfigFn
 * @param {string} phase
 * @param {any=} context
 * @returns {Promise<import("next").NextConfig>|import("next").NextConfig}
 */

/**
 * @callback NextPlugin
 * @param {import("next").NextConfig} config
 * @returns {import("next").NextConfig}
 */

/**
 * @callback NextPluginFn
 * @param {import("next").NextConfig} config
 * @returns {NextConfigFn}
 */

/**
 *
 * @param  {(NextPlugin|NextPluginFn)[]} plugins
 * @returns
 */
export function composePlugins(...plugins) {
	return (/** @type {import("next").NextConfig} */ baseConfig) =>
		async function combined(
			/** @type {string} */ phase,
			/** @type {any} */ context,
		) {
			let config = baseConfig

			for (const plugin of plugins) {
				const configOrFn = (await Promise.resolve(plugin))(config)

				if (_.isFunction(configOrFn)) {
					config = await configOrFn(phase, context)
					continue
				}

				config = configOrFn
			}

			return config
		}
}

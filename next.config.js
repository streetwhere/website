import { composePlugins } from "./src/utils.js";
import { next as withMillion } from "million/compiler";
import withBundleAnalyzer from "@next/bundle-analyzer";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/utils.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

const plugins = [
	withMillion,
	withBundleAnalyzer({ enabled: env.ANALYZE === "true" }),
];

//@ts-ignore
export default composePlugins(...plugins)(nextConfig);

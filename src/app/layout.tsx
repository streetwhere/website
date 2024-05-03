import "~/styles/globals.css";
import { Onest } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import type { Viewport, Metadata } from "next";
import Header from "./_components/header";

const onest = Onest({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const viewport: Viewport = {
	themeColor: "#09090b",
	colorScheme: "dark",
};

export const metadata: Metadata = {
	generator: "Next.js",
	applicationName: "streetwhere?",

	title: {
		default:
			"streetwhere? - Find streetbrands all around the world and stay notified when thy drop clothes.",
		template: "%s - streetwhere?",
	},

	description:
		"Manage many different clothing drops and releases from a central place. Streetwhere? notifies you of the latest drops and gives you an overview with periodical clothing drop summaries.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TRPCReactProvider>
			<ClerkProvider>
				<html lang="en" className="dark">
					<body
						className={`font-sans ${onest.variable} overflow-visible`}
					>
						<Script
							src="https://eu.umami.is/script.js"
							data-website-id="51efa585-c6e8-4bc2-a6c5-3b482aed079f"
						/>

						<div className="min-h-screen flex flex-col justify-between">
							<Header />

							<div role="main" className="grow flex">
								{children}
							</div>
						</div>
					</body>
				</html>
			</ClerkProvider>
		</TRPCReactProvider>
	);
}

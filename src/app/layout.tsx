import "~/styles/globals.css";
import { Onest } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";

const onest = Onest({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Create T3 App",
	description: "Generated by create-t3-app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${onest.variable}`}>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}

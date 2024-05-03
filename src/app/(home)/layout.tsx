export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			Home
			{children}
		</div>
	);
}

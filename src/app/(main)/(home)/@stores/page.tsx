export default async function Stores() {
	await new Promise((resolve) => setTimeout(resolve, 4000))

	return (
		<>
			<span className="font-title text-4xl font-medium">
				Popular Stores
			</span>
		</>
	)
}

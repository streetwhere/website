import Image from "next/image";

export default function Carousel() {
	return (
		<div className="h-[54vh] min-h-80 w-full relative">
			<Image
				src={"/vicinity_banner.webp"}
				alt="banner image"
				width={1920}
				height={615}
				className="opacity-100 w-full h-full object-cover"
			/>
		</div>
	);
}

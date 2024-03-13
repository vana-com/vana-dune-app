
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sands Of Arrakis | Character Error",
	description: "Sands Of Arrakis - Character Error",
};

type Props = {
	children: React.ReactNode,
}

import Image from 'next/image';

export default function ErrorLayout({ children }: Props) {
	return (
		<>
			<div className="questions-layout h-[auto] 4xs:h-full ">
				<div className="relative z-[15] h-full">
					{children}
				</div>

			</div>
		</>
	)
}
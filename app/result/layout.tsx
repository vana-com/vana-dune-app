
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sands Of Arrakis | Result",
	description: "Sands Of Arrakis | Result",
};

type Props = {
	children: React.ReactNode,
}

import Image from 'next/image';

export default function QuestionsLayout({ children }: Props) {
	return (
		<>
			<div className="questions-layout h-full">
				<div className="relative z-10 h-full">
					{children}
				</div>
				<div className="bg-wrapper bg-default absolute top-0 right-0 bottom-0 left-0">

					<div
						style={{
							backgroundSize: '100% 100%'
						}}
						className="w-full h-[112px] absolute top-[35px] bg-cover bg-sub-layer-2"></div>

					<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
						className="w-[150px] h-[131px]  absolute top-[45px] right-[3px]"
					/>

					<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
						className="w-[100px] h-[131px]  absolute top-[70px] left-[32px] z-10"
					/>

				</div>
			</div>
		</>
	)
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sands Of Arrakis | Loading...",
	description: "Sands Of Arrakis - Loading Page",
};

type Props = {
	children: React.ReactNode,
}

import Image from 'next/image';

export default function QuestionsLayout({ children }: Props) {
	return (
		<>
			<div className="questions-layout h-[auto] 4xs:h-full ">
				<div className="relative z-[15] h-full">
					{children}

					<div className="bg-wrapper absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
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

						<div className="w-full h-[69px] absolute bottom-0 bg-cover bg-sub-layer-1"></div>
					</div>
				</div>

			</div>
		</>
	)
}
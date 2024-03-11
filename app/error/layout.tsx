
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

					<div className="bg-wrapper absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
						<div
							style={{
								backgroundSize: '100% 100%'
							}}
							className="bg-sub-layer-2 w-full h-[112px] absolute top-[35px] bg-cover"></div>

						<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
							className="w-[150px] h-[131px]  absolute top-[45px] right-[3px]"
						/>

						<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
							className="w-[100px] h-[131px]  absolute top-[70px] left-[32px] z-10"
						/>

						<div className="bg-sub-layer-1 w-full h-[69px] absolute bottom-0 bg-cover"></div>
					</div>
				</div>

			</div>
		</>
	)
}
"use client";

import { Nav, CustomButton } from "./../components/components";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { common } from "../utils/common";
export default function NotFound() {
	const router = useRouter()
	const goToHome = () => {
		router.push(`${common.vanaWebsite}`)
	}
	return (
		<>
			<div className="bg-default h-screen">

				<Nav></Nav>
				<div className="content-page h-[calc(100%-62px)] p-[15px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem]">
					<div className="landing-page h-full">
						<div className="relative z-[100] text-center h-full pt-[100px]">
							<div
								style={{
									letterSpacing: '8px',
									textShadow: '-5px 0px 0px rgba(242, 77, 77, 1)'
								}}

								className="font-mona-sans-extra-bold text-primary-4 font-extrabold text-[48px] leading-[48px] 2xs:text-[64px] 2xs:leading-[64px] xs:text-[71px] xs:leading-[71px] sm:text-[98px] sm:leading-[98px]">
								UH-OH !
							</div>
							<div className="font-brooklyn font-bold  text-primary-1 text-[18px] px-[20px] mb-[1.75rem]">
								<p>{`There's a missing piece to your digital persona.`}</p>
							</div>

							<div className="font-brooklyn font-normal  text-primary-1 text-[16px] px-[20px]">
								<p>{`Head to the Vana app, under "Profile", and make sure you have you have all of your "Look data complete. Then come back and try again.`}</p>
							</div>

							<div className="sm:w-[40%] mx-auto font-mona-sans-semibold text-primary-1 text-[18px] font-semibold xs:px-[30px] mt-[55px]">
								<CustomButton
									title={`Back to VANA`}
									isActive={true}
									onClicked={goToHome}
								></CustomButton>
							</div>
						</div>
						<div className="bg-wrapper absolute top-0 right-0 bottom-0 left-0">

							<Image src={`/resources/bg/moon.svg`} alt="moon" width="92" height="92"
								className="w-[92px] h-[92px]  absolute top-[110px] right-[71px] z-[1]"
							/>

							<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
								className="w-[150px] h-[131px]  absolute top-[45px] right-[3px]"
							/>

							<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
								className="w-[100px] h-[131px]  absolute top-[70px] left-[32px] z-10"
							/>

							<div className="bg-fog-2 w-full h-[411px] absolute bottom-[220px] bg-cover"></div>

							<div className="bg-sand-layer-2 w-full h-[180px] absolute bottom-[124px] bg-cover"></div>

							<div className="bg-sand-layer-1 w-full h-[180px] absolute bottom-0 bg-cover"></div>

						</div>
					</div>
				</div>
			</div>

		</>
	)
}
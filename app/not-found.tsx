"use client";

import { Nav, CustomButton } from "./components/components";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter()
	const goToHome = () => {
		router.push("/")
	}
	return (
		<>
			<div className="bg-default h-screen">

				<Nav></Nav>
				<div className="content-page h-[calc(100%-62px)] p-[15px]">
					<div className="landing-page h-full">
						<div className="relative z-[100] text-center h-full pt-[100px]">
							<div
								style={{
									letterSpacing: '8px',
									textShadow: '-5px 0px 0px rgba(242, 77, 77, 1)'
								}}

								className="font-mona-sans-extra-bold text-primary-4 text-[98px] font-extrabold">
								404
							</div>
							<div className="font-brooklyn font-bold  text-primary-1 text-[16px] px-[20px]">
								<p>{`We can’t seem to find the page You’re looking for`}</p>
							</div>
							<div className="sm:w-[40%] mx-auto font-mona-sans-semibold text-primary-1 text-[18px] font-semibold xs:px-[30px] mt-[55px]">
								<CustomButton
									title={`Back to Homepage`}
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
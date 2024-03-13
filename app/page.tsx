"use client";
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import Image from 'next/image';

import { Nav, CustomButton, Modal } from "./components/components";
import { useEffect, useState } from 'react';
import { fn } from './utils/fn';
export default function LandingPage() {
	const [isClickedLogin, setIsClickLogin] = useState(false);
	const [showSessionError, setShowSessionError] = useState(false);

	const router = useRouter();
	const cookies = useCookies();

	const closeShowSessionError = () => {
		setTimeout(() => {
			setShowSessionError(false)
		}, 100);
	}

	const goToQuestions = () => {
		// for test only
		// cookies.set('_code_verifier', '1')
		// setTimeout(() => {
		// 	router.push('/questions');
		// }, 350);
		// return

		if (cookies.get('_code_verifier') && cookies.get('_token')) {
			router.push('/questions');
		} else {
			reqAuthUrl();
		}
	}

	const reqAuthUrl = async () => {
		const expiryDate: any = fn.getCookieExpiryDate(3);

		if (isClickedLogin) {
			console.log("Processing, please wait...")
			return;
		}

		setIsClickLogin(true);
		try {
			const res = await fetch(`api/getAuthUrl`);
			const data = await res.json();

			if (data && data.error) {
				setShowSessionError(true);
			} else {
				document.cookie = `_code_verifier=${data.code_verifier ? data.code_verifier : ''}; expires=${expiryDate}; path=/`;
				router.push(data.url)
			}
			setIsClickLogin(false);
		} catch (error) {
			console.log("error", error)
			setIsClickLogin(false);
		}

	}

	useEffect(() => {
		cookies.remove('is-clicked-discover');
		cookies.remove('is-prompt-generate');
		cookies.remove('is-clicked-discover');
	}, [cookies])
	return (
		<>

			<div className="bg-default h-screen">
				<Nav></Nav>

				<div className="h-[calc(100%-62px)]">
					<div className="landing-page h-full">
						<div className="relative z-10 text-center h-full pt-[45px]">
							<div className="font-dune-rise text-primary-1 text-[37px] tracking-[3.7px] font-extrabold indent-[-15px] px-[15px] pt-[15px] md:indent-0">
								SANDS OF ARRAKIS
							</div>
							<div className="font-mona-sans-medium text-primary-1 text-[16px] font-medium pt-[36px] px-[20px]">
								<p>Embark on the Journey Through the </p>
								<p>Sand of Fate:</p>
								<p>Discover Your Inner Dune Character</p>
							</div>
							<div className="sm:w-[50%] sm:mx-auto md:w-[40%] lg:w-[30%] font-mona-sans-semibold text-primary-1 text-[18px] font-semibold px-[25px] absolute bottom-[75px] right-0 left-0">
								<CustomButton
									title={`Embark on the Journey`}
									isActive={true}
									onClicked={goToQuestions}
								></CustomButton>
							</div>

							<div className="bg-wrapper absolute top-[-62px] right-0 bottom-0 left-0 overflow-hidden z-[-20] h-[calc(100%+62px)] ">

								<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
									className="w-[150px] h-[131px]  absolute top-[56px] right-[21px] sprite-right-stars"
								/>

								<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
									className="w-[100px] h-[131px]  absolute bottom-[511px] left-[18px] sprite-left-stars"
								/>

								<Image src={`/resources/bg/moon.svg`} alt="moon" width="92" height="92"
									className="w-[92px] h-[92px]  absolute bottom-[422px] right-[64px] z-[1] sprite-moon"
								/>

								<Image src={`/resources/bg/character.svg`} alt="character" width="37" height="37"
									className="w-[37px] h-[37px]  absolute bottom-[286px] right-[95px] z-[1] sprite-character"
								/>

								<Image src={`/resources/bg/footprint.png`} alt="footprint" width="46" height="26"
									className="w-[46px] h-[26px]  absolute bottom-[256px] right-[121px] z-[1] sprite-footprint"
								/>

								<div className="bg-fog w-full h-[440px] absolute bottom-[280px] bg-cover sprite-layer-4"></div>

								<div className="bg-layer-3 w-full h-[225px] absolute bottom-[181px] bg-cover sprite-layer-3"></div>

								<div className="bg-layer-2 w-full h-[129px] absolute bottom-[109px] bg-cover sprite-layer-2"></div>

								<div className="bg-layer-1 w-full h-[129px] absolute bottom-0 bg-cover sprite-layer-1"></div>

							</div>
						</div>
						{/* <div className="bg-wrapper absolute top-0 right-0 bottom-0 left-0 overflow-hidden">

							<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
								className="sprite-right-stars w-[150px] h-[131px]  absolute top-[56px] right-[21px]"
							/>

							<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
								className="sprite-left-stars w-[100px] h-[131px]  absolute bottom-[511px] left-[18px]"
							/>

							<Image src={`/resources/bg/moon.svg`} alt="moon" width="92" height="92"
								className="sprite-moon w-[92px] h-[92px]  absolute bottom-[422px] right-[64px] z-[1]"
							/>

							<Image src={`/resources/bg/character.svg`} alt="character" width="37" height="37"
								className="sprite-character w-[37px] h-[37px]  absolute bottom-[286px] right-[95px] z-[1]"
							/>

							<Image src={`/resources/bg/footprint.png`} alt="footprint" width="46" height="26"
								className="sprite-footprint w-[46px] h-[26px]  absolute bottom-[256px] right-[121px] z-[1]"
							/>

							<div className="sprite-layer-4 bg-fog w-full h-[440px] absolute bottom-[280px] bg-cover"></div>

							<div className="sprite-layer-3 bg-layer-3 w-full h-[225px] absolute bottom-[181px] bg-cover"></div>

							<div className="sprite-layer-2 bg-layer-2 w-full h-[129px] absolute bottom-[109px] bg-cover"></div>

							<div className="sprite-layer-1 bg-layer-1 w-full h-[129px] absolute bottom-0 bg-cover"></div>

						</div> */}
					</div>
				</div>
			</div>

			<Modal
				minH={''}
				showModal={showSessionError}
				closeModal={closeShowSessionError}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Error!</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
					<p>Unexpected internal server error.</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Try again`}
						isActive={true}
						onClicked={closeShowSessionError}
					></CustomButton>
				</div>
			</Modal>

		</>
	)
}
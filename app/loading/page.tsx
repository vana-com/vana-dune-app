"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Nav, HelpSupport, SwiperSlider } from "./../components/components";

import { speedPerSlide, slidesArr } from "../utils/loadingslide"
import { useCookies } from 'next-client-cookies';

export default function Loading() {
	const router = useRouter()
	const cookies = useCookies();

	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [loadingValue, setLoadingValue] = useState<number>(0);

	const [itemIndex, setItemIndex] = useState<number>(0);
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [slides, setSlides] = useState<any>(slidesArr)

	const changeIndex = (e: any) => {
		setIsChanged(true);
		setTimeout(() => {
			setItemIndex(e);
			setIsChanged(false);
		}, 100);
	}



	useEffect(() => {
		let timeout: any = undefined;
		let interval: any = null;
		if (isLoaded) {

			let count = 0;
			let valueArray: Array<number> = []
			for (let i = 0; i < slides.length; i++) {
				if (valueArray[i - 1]) {
					valueArray.push((100 / slides.length) + valueArray[i - 1])
				} else {
					valueArray.push(100 / slides.length)
				}
			}

			const setProgressValue = () => {
				interval = setInterval(() => {
					count++;
					let newLoadingValue: any = valueArray[count - 1];
					setLoadingValue(Math.round(newLoadingValue));

					if (count == slides.length) {
						timeout = setTimeout(() => {
							router.push("/result");
						}, 300);
						clearInterval(interval);
					}
				}, speedPerSlide)
			}

			setProgressValue();
		}
		setIsLoaded(true);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoaded, slides])

	useEffect(() => {
		if (!cookies.get('is-clicked-discover')) {
			router.push("/")
			return
		}
		cookies.remove('is-clicked-discover');
	}, [cookies, router])

	return (
		<>
			<div 
				style={{
					"backgroundImage": "linear-gradient(185deg, #C6918B, #F6D3B9)"
				}}
				className="min-h-[100vh]">
				<Nav></Nav>

				{/* content-page  */}
				<div className="h-full py-[15px] relative z-[20]">
					<div className="content-page px-[15px] pt-[10px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem]">
						<div className="font-mona-sans-semibold font-semibold text-[14px] text-primary-1 text-center">
							{loadingValue}%
						</div>
						<div className="rounded-[6px] overflow-hidden mt-[8px]">
							<ProgressBar
								completed={loadingValue}
								bgColor="#EC6A6A"
								borderRadius="0"
								baseBgColor="#fff"
								labelColor="#EC6A6A"
								transitionDuration={`0.5s`}
								height={'11px'}
							/>
						</div>
					</div>

					<div className="xs:min-h-[310px]">
						<SwiperSlider currentActiveIndex={itemIndex} slides={slides} changeIndex={changeIndex}></SwiperSlider>
					</div>


					<div className="content-page px-[16px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem] pb-[100px]">
						<div
							style={{
								textShadow: '-2.5px 0px 0px rgba(242, 77, 77, 1)',
								letterSpacing: '1.95px',
								textTransform: "uppercase"
							}}
							className={`font-mona-sans-extra-bold font-extrabold text-primary-4 text-[25px] text-center leading-[24px] ${isChanged ? 'opacity-[0.7]' : ''}`}>
							{slides[itemIndex].name}
						</div>

						<div 
							style={{
								letterSpacing: '0.50px'
							}}
							className={`font-brooklyn font-semibold text-[16px] leading-[26px] text-[#373737] mt-[16px] ${isChanged ? 'opacity-[0.7]' : ''} lg:px-[8rem]`}>
							{slides[itemIndex].desc}
						</div>

						<div className="custom-pagination flex items-center justify-center mt-[20px]">
							{
								slides.map((item: any, index: number) => (
									<div
										onClick={() => {
											setItemIndex(index)
										}}
										key={index}
										className={`${itemIndex == index ? 'swiper-pagination-bullet-active' : ''} swiper-pagination-bullet`}>
									</div>
								))
							}
						</div>
					</div>

				</div>

			</div>

			<HelpSupport></HelpSupport>
		</>
	)
}
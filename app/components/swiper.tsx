"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'

export function SwiperSlider(prop: any) {
	const { changeIndex, slides, currentActiveIndex, slideTo } = prop;

	const [swiperRef, setSwiperRef] = useState<any>(null);
	const [activeIndex, setActiveIndex] = useState(0)

	const playTime: number = 2500;


	const onSnapIndexChange = (e: any) => {
		changeIndex(e.activeIndex)
	}

	useEffect(() => {
		setActiveIndex(currentActiveIndex);

		// console.log("swiperRef", swiperRef)
		if (swiperRef) {
			swiperRef.slideTo(currentActiveIndex)
		}
	}, [currentActiveIndex, swiperRef])

	return (
		<>
			<Swiper
				speed={1000}
				threshold={20}
				shortSwipes={false}
				longSwipes={true}
				longSwipesMs={125}
				effect={`coverflow`}
				coverflowEffect={{
					rotate: 0,
					scale: 0.7,
					stretch: 20,
					depth: 800,
					modifier: 1,
					slideShadows: false,
				}}
				loop={false}
				onSwiper={setSwiperRef}
				slidesPerView={1}
				centeredSlides={true}
				spaceBetween={10}
				autoplay={{
					delay: playTime,
					disableOnInteraction: true,
				}}
				navigation={false}
				// pagination={{
				// 	clickable: true,
				// }}
				modules={[
					// Autoplay, // remove comment for auto play
					EffectCoverflow,
					// Pagination,
					Navigation,
				]}
				onSnapIndexChange={(swiper) => {
					onSnapIndexChange(swiper)
				}}

				breakpoints={{
					425: {
						slidesPerView: 1.5,
						spaceBetween: 10,
						coverflowEffect: {
							depth: 300,
							stretch: 0,
						}
					},
					695: {
						slidesPerView: 2,
						spaceBetween: 10,
						coverflowEffect: {
							depth: 300,
							stretch: 0,
						}
					},
					767: {
						slidesPerView: 2.5,
						spaceBetween: 10,
						coverflowEffect: {
							scale: 0.8,
							depth: 300,
							stretch: 0,
						}
					}
				}}
				className="mySwiper"
			>

				{slides.map((item: any, index: number) => (
					<SwiperSlide key={index} >
						<div className="swiper-mask fixed bottom-0 top-0 right-0 left-0"></div>

						<div className="box-wrapper xs:min-h-[300px]">
							<div className={`box-content`}>
								<div className="avatar w-[210px] h-[210px] max-w-[286px] mx-auto avatar relative 2xs:h-[286px] 2xs:w-[auto] rounded-[50%] border-solid border-[white] border-[2px] flex justify-center items-center mt-[10px] mb-[24px]">
									<Image priority={true} className="absolute top-0 right-0 bottom-0 left-0 h-[90%] w-[90%] m-auto 2xs:h-[250px] 2xs:w-[250px]" src={`/resources/bg/inner-border.svg`} alt="poster" width="300" height="300" />
									<Image className="rounded-[50%] h-[75%] w-[75%] m-auto 2xs:h-[193px] 2xs:w-[193px]" src={`/avatars/${item.avatar}.png`} alt="poster" width="230" height="230" />
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}

			</Swiper>

		</>
	);
}
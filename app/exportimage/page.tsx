"use client";

import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { fn } from "../utils/fn";
import { toPng } from 'html-to-image';

// issues of ios
// https://github.com/eligrey/FileSaver.js/issues/686?fbclid=IwAR2SFdLdm405W4RSMWfDViIUd41t_A6No-fVaw2Ibn7gCnfUxMHNp8fL374
// https://stackoverflow.com/questions/32371969/iphone-browsers-unable-to-download-image

// https://www.npmjs.com/package/react-loading
import ReactLoading from 'react-loading';

export default function ExportImage() {

	const ref = useRef(null)
	const [height, setHeight] = useState<any>(0)
	const [padding, setPadding] = useState<any>(0)


	const [resultData, setResultData] = useState<any>(null);
	const [avatar, setAvatar] = useState<any>("")
	const [isMobile, setIsMobile] = useState<boolean>(false)

	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [dataUrl, setDataUrl] = useState<any>(null)
	const hasWindow = typeof window !== 'undefined';



	const [windowDimensions, setWindowDimensions] = useState<any>();

	useEffect(() => {
		if (hasWindow) {

			const getWindowDimensions = () => {
				const width = hasWindow ? window.innerWidth : null;
				const height = hasWindow ? window.innerHeight : null;
				return {
					width,
					height,
				};
			}

			const handleResize = () => {
				setWindowDimensions(getWindowDimensions());
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [hasWindow]);

	const elementRef: any = useRef(null);
	const htmlToImageConvert = async () => {


		// https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
		await toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {

			})
			.catch((err) => {
				console.log(err);
			});

		await toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {

			})
			.catch((err) => {
				console.log(err);
			});

		await toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {

			})
			.catch((err) => {
				console.log(err);
			});

		await toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {

			})
			.catch((err) => {
				console.log(err);
			});

		const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
		await delay(1000)

		await toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl: any) => {

				var filename = resultData.tribe + "-" + new Date().getTime()
				if (isMobile || fn.getMobileOperatingSystem() == 'iOS') {
					if (fn.getMobileOperatingSystem() == 'iOS') {
						setDataUrl(dataUrl)
						setHeight(elementRef.current.clientHeight);
						setPadding(elementRef.current.clientHeight - windowDimensions.height)
					} else {
						const link = document.createElement("a");
						link.target = '_blank'
						link.download = `${filename}.png`;
						document.body.appendChild(link);
						link.href = dataUrl;
						link.click();
						document.body.removeChild(link);
						setIsLoaded(true)
						setTimeout(() => {
							window.close();
						}, 1000);
					}

				} else {
					const link = document.createElement("a");
					link.target = '_blank'
					link.download = `${filename}.png`;

					link.href = dataUrl;
					link.click();
					setIsLoaded(true)
					window.close();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onImageLoaded = () => {
		setTimeout(() => {
			// setIsLoaded(true)// test
			htmlToImageConvert();
		}, isMobile ? 2500 : 1000);
	}

	useEffect(() => {
		setIsMobile(fn.isMobile())

		const getSavedPrompt = async (user_id: any = '') => {
			if (!user_id) {
				window.close();
				return;
			}

			try {
				const res = await fetch(`api/getSavedPrompt/${user_id}`);

				const data = await res.json();
				if (data && data.error) {

				} else {
					if (data.status) {
						setResultData(data)
						setAvatar(data.image);
					} else {

					}
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		if (typeof window !== 'undefined') {
			let user_id: any = fn.localStorage.get('user_id');
			if (user_id) {
				getSavedPrompt(user_id)
			} {

			}
		}
		return () => { }
	}, [])

	const Loading = ({ type, color }: any) => (
		<ReactLoading type={type} color={color} height={50} width={50} />
	);

	if (!avatar) return null;
	return (
		<>
			{
				!isLoaded ?
					<div className="fixed top-0 right-0 bottom-0 left-0 z-[9999] backdrop-blur-sm">
						<div className="w-[100%] h-[100%] flex justify-center items-center">
							<Loading color={'#A8DADC'} type={'spin'}></Loading>
						</div>
					</div>
					:
					null
			}

			{
				dataUrl ?
					<div className={` fixed top-0 right-0 bottom-0 left-0 z-[9999] backdrop-blur-sm`} >
						<div className="w-[100%] h-[100%] flex justify-center items-center">
							<img
								style={{
									paddingTop: `${padding}px`
								}}
								src={dataUrl}
								className={`w-[100%] h-[${height}px]`}
								alt="result" />
						</div>
					</div>
					:
					null
			}

			<div id="elementImage" ref={elementRef} className={`${dataUrl ? 'hidden' : null} bg-default min-h-[100vh]`}>
				<div className="h-full">
					<div className="relative z-[100] text-center flex justify-center items-center">

						<div className="relative z-[20] p-[15px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem] 2xl:w-[1200px] 2xl:mx-auto pt-[2rem]">
							<div className="block min-[600px]:flex min-[600px]:items-end min-[600px]:justify-evenly mb-[15px] flex-wrap">

								<div className="flex justify-center items-center">
									<div className="min-[600px]:mx-[unset] mb-[1rem] w-[266px] h-[266px] min-w-[266px] max-w-[266px] avatar relative 2xs:h-[266px] 2xs:w-[auto] rounded-[50%] border-solid border-[white] border-[2px] flex justify-center items-center">
										<Image priority={true} className="absolute top-0 right-0 bottom-0 left-0 h-[90%] w-[90%] m-auto 2xs:h-[234px] 2xs:w-[234px]" src={`/resources/bg/inner-border.svg`} alt="poster" width="234" height="234" />

										<div className="rounded-[50%] h-[75%] w-[75%] m-auto 2xs:h-[180px] 2xs:w-[180px] object-cover">

											<img
												onLoad={() => {
													onImageLoaded()
												}}
												style={{
													objectFit: 'cover',
													margin: 'auto'
												}}

												src={avatar}
												className="rounded-[50%] h-[100%] w-[100%] object-cover"
												// src={`/resources/avatar/1.png`}
												alt="avatar" width="180" height="180" />
										</div>
									</div>
								</div>

								<div>
									<div
										style={{
											textShadow: '-6px 0px 0px rgba(242, 77, 77, 1)'
										}}
										className="min-h-[80px] font-mona-sans-extra-bold text-primary-4 text-[50px] leading-[50px] xs:text-[80px] xs:leading-[80px] sm:text-[109px] sm:leading-[109px] font-extrabold text-center  md:pt-[2rem]">
										{
											resultData ?
												<p>{resultData.tribe}</p>
												: null
										}
									</div>
								</div>

							</div>

							<div className="flex justify-center items-center">
								<img className="" src={`/resources/line-breaker.png`} alt="line-breaker" width="91" height="18" />
							</div>

							<div className="relative font-mona-sans-bold font-bold text-[#A62C39] text-center text-[14px] sm:text-[20px] indent-[10px] px-[5px] pt-[20px] mb-[24px]">
								<Image
									className="absolute top-0 left-0 4xs:left-[2rem] sm:left-[6rem] md:left-[8rem] lg:left-[10rem]"
									src={`/resources/quote.svg`} alt="qoute" width="56" height="56" />
								<p className="block px-[5px]">
									{
										resultData ?
											resultData.quote : ''}
								</p>
							</div>

							<div
								className="content-data px-[12px] pt-[12px] pb-[24px]">

								<div className="mt-[10px] xs:px-[2rem] md:px-[4rem] md:pt-[1.5rem] md:pb-[2rem] lg:px-[8rem] xl:px-[6rem]">

									<div className="font-brooklyn font-semibold text-[14px] text-primary-6 text-left sm:text-[16px]">

										{
											resultData ?
												<p className="line-clamp-[7] min-[600px]:line-clamp-[12]">{resultData.story}</p>
												: null
										}

									</div>

								</div>

								<div className="mt-[1.75rem]">
									<div>
										<p className="mb-[1rem] font-mona-sans-bold text-[22px] sm:text-[32px]">TAP LINK TO SEE MORE</p>
									</div>

									<div className="flex items-center justify-center">
										<div className="font-aveny font-normal flex items-center bg-white rounded-[5px] text-[#262626] text-[24px] leading-[24px] sm:text-[40px] sm:leading-[40px] p-[8px]">
											<img
												className="mr-[5px]"
												src={`/resources/link.svg`} alt="link" width="24" height="24" />
											<p>{`SANDSOFARRAKIS.ME`}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-wrapper absolute top-0 right-0 bottom-0 left-0 min-h-[100vh] z=[-1]">

							<Image src={`/resources/bg/right-stars.png`} alt="right-stars" width="150" height="131"
								className="sprite-right-stars w-[150px] h-[131px]  absolute top-[56px] right-[21px]"
							/>

							<Image src={`/resources/bg/left-stars.png`} alt="left-stars" width="100" height="131"
								className="sprite-left-stars w-[100px] h-[131px]  absolute bottom-[511px] left-[18px]"
							/>

							<Image src={`/resources/bg/character.svg`} alt="character" width="37" height="37"
								className="sprite-character w-[37px] h-[37px]  absolute bottom-[286px] right-[95px] z-[1]"
							/>

							{/* <Image src={`/resources/bg/footprint.png`} alt="footprint" width="46" height="26"
								className="sprite-footprint w-[46px] h-[26px]  absolute bottom-[256px] right-[121px] z-[1]"
							/> */}

							<div className="sprite-layer-4 bg-fog w-full h-[440px] absolute bottom-[280px] bg-cover"></div>

							<div className="sprite-layer-3 bg-layer-3 w-full h-[225px] absolute bottom-[181px] bg-cover"></div>

							<div className="sprite-layer-2 bg-layer-2 w-full h-[129px] absolute bottom-[109px] bg-cover"></div>

							<div className="sprite-layer-1 bg-layer-1 w-full h-[129px] absolute bottom-0 bg-cover"></div>
						</div>
					</div>


				</div>


			</div>

		</>
	)
}
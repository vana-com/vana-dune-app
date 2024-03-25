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

import { useSearchParams, useRouter } from 'next/navigation';

export default function ExportImage() {
	const searchParams = useSearchParams()
	const saveImage = searchParams.get('saveImage'); // for the guest
	const router = useRouter()
	const ref = useRef(null)
	const [height, setHeight] = useState<any>(0)
	const [padding, setPadding] = useState<any>(0)


	const [resultData, setResultData] = useState<any>(null);
	const [avatar, setAvatar] = useState<any>("")
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [qoute, setQoute] = useState<any>("")

	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [dataUrl, setDataUrl] = useState<any>(null)
	const hasWindow = typeof window !== 'undefined';
	const [story, setStory] = useState<any>("")



	const [windowDimensions, setWindowDimensions] = useState<any>();

	useEffect(() => {
		if (hasWindow) {

			const getWindowDimensions: any = () => {
				const width = hasWindow ? window.innerWidth : null;
				const height = hasWindow ? window.innerHeight : null;
				return {
					width,
					height,
				};
			}

			setWindowDimensions(getWindowDimensions());
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
					// console.log("fn.getMobileOperatingSystem()", fn.getMobileOperatingSystem())
					// console.log("fn.checkBrowserType()", fn.checkBrowserType())

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
						if (fn.checkBrowserType() == 'Firefox') {

						} else {
							setTimeout(() => {
								window.close();
								fn.localStorage.set("download-success", "1")
							}, 1000);
						}
					}

				} else {
					const link = document.createElement("a");
					link.target = '_blank'
					link.download = `${filename}.png`;

					link.href = dataUrl;
					link.click();

					if (fn.checkBrowserType() == 'Firefox') {
						setTimeout(() => {
							setIsLoaded(true);
							setTimeout(() => {
								fn.localStorage.set("download-success", "1")
								window.close();
							}, 1000);
						}, 2000);
					} else {
						setIsLoaded(true);
						setTimeout(() => {
							fn.localStorage.set("download-success", "1")
							window.close();
						}, 1000);
					}
				}
			})
			.catch((err) => {
				console.log(err);
				fn.localStorage.set("download-success", "0")
				window.close();
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

		function addSpaceAfterComma(text: any) {
			// Replace every comma not followed by a space with a comma followed by a space
			return text.replace(/([,.])([^ ])/g, '$1 $2');
		}

		const getSavedPrompt = async (user_id: any = '') => {
			try {
				const res = await fetch(`api/getSavedPrompt/${user_id}`);

				const data = await res.json();
				if (data && data.error) {
					if (saveImage) {
						window.close();
					} else {
						router.replace("/")
					}
				} else {
					if (data.status) {
						let story = addSpaceAfterComma(data.story);
						setStory(story)
						setResultData(data)
						setAvatar(data.image);
						setQoute(fn.sanitizeText(data.quote))
					} else {
						router.replace("/error")
					}
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		if (typeof window !== 'undefined') {
			let user_id: any = fn.localStorage.get('user_id');
			getSavedPrompt(user_id)
		}
		return () => { }
	}, [router, saveImage])

	const Loading = ({ type, color }: any) => (
		<ReactLoading type={type} color={color} height={50} width={50} />
	);

	// if (!avatar) return
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
					<div className={`fixed top-0 right-0 bottom-0 left-0 z-[9999] backdrop-blur-sm overflow-y-auto`} >
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
							<div className="block">

								<div className="flex justify-center items-center">
									<div className="min-[600px]:mx-[unset] mb-[1rem] w-[277px] h-[277px] min-w-[277px] max-w-[277px] avatar relative 2xs:h-[277px] 2xs:w-[auto] rounded-[50%] border-solid border-[white] border-[2px] flex justify-center items-center">
										<Image priority={true} className="absolute top-0 right-0 bottom-0 left-0 h-[90%] w-[90%] m-auto 2xs:h-[245px] 2xs:w-[245px]" src={`/resources/bg/inner-border.svg`} alt="poster" width="234" height="234" />

										<div className="rounded-[50%] h-[75%] w-[75%] m-auto 2xs:h-[192px] 2xs:w-[192px] object-cover">

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
											textShadow: '-5px 0px 0px rgba(242, 77, 77, 1)'
										}}
										className="2xs:min-h-[80px] font-mona-sans-extra-bold text-primary-4 text-[30px] leading-[30px] 2xs:text-[35px] 2xs:leading-[35px] xs:text-[50px] xs:leading-[50px] sm:text-[60px] sm:leading-[60px] font-extrabold text-center  md:pt-[2rem]">
										{
											resultData ?
												<p
													style={{
														letterSpacing: "3px",
														textTransform: "uppercase"
													}}
												>{resultData.tribe}</p>
												: null
										}
									</div>
								</div>

							</div>

							<div className="flex justify-center items-center mt-[10px]">
								<img className="" src={`/resources/line-breaker.png`} alt="line-breaker" width="91" height="18" />
							</div>

							<div className="relative font-mona-sans-bold font-bold text-[#A62C39] text-center text-[14px] sm:text-[20px] indent-[10px] px-[5px] pt-[20px] mb-[24px]">
								<Image
									className="absolute top-0 left-0 4xs:left-[1.75rem] sm:left-[6rem] md:left-[8rem] lg:left-[10rem]"
									src={`/resources/quote.svg`} alt="qoute" width="56" height="56" />
								<p className="block px-[5px] font-mona-sans-bold text-[16px]" style={{ wordBreak: "break-all" }}>
									{
										resultData ?
											qoute : ''}
								</p>
							</div>

							<div
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.75)"
								}}
								className="content-data px-[12px] pt-[12px] pb-[24px]">

								<div className="mt-[5px] xs:px-[2rem] md:px-[4rem] md:pt-[1.5rem] md:pb-[2rem] lg:px-[8rem] xl:px-[6rem]">

									<div className="font-brooklyn font-semibold text-[14px] text-primary-6 text-left sm:text-[14px]">

										{
											resultData ?
												<p
													style={{
														letterSpacing: "0.75px"
													}}
													className="line-clamp-[7] min-[600px]:line-clamp-[12]">{story}</p>
												: null
										}

									</div>

								</div>

								{/* <div className="mt-[1.75rem]">
									<div>
										<p className="font-mona-sans-bold text-[20px] sm:text-[24px] text-[#262626]">TAP LINK TO SEE MORE</p>
									</div>

									<div className="mt-[1.25rem] flex items-center justify-center">
										<div className="font-aveny font-normal flex items-center bg-white rounded-[5px] text-[#262626] text-[26px] leading-[26px] sm:text-[35px] sm:leading-[35px] p-[8px]">
											<img
												className="mr-[5px]"
												src={`/resources/link.svg`} alt="link" width="24" height="24" />
											<p className="leading-[26px]">{`SANDSOFARRAKIS.ME`}</p>
										</div>
									</div>
								</div> */}
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
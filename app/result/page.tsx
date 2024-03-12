"use client";
import { useState, useEffect } from "react";

import {
	Nav,
	CustomButton,
	HelpSupport,
	Modal,
	ModalBottom,
	ShareMessage,
	Video
} from "./../components/components";
import { useRouter } from 'next/navigation';

import { common } from "../utils/common";
import Image from 'next/image'
import { useCookies } from 'next-client-cookies';
import { useSearchParams } from 'next/navigation';
import { fn } from "../utils/fn";
export default function Result() {
	const searchParams = useSearchParams()
	const userID = searchParams.get('user_id');

	const router = useRouter();
	const cookies = useCookies();

	const [coins, setCoins] = useState(10);
	const [showModalTryAgain, setShowModalTryAgain] = useState(false);
	const [showModalCoin, setShowModalCoin] = useState(false);
	const [showSoCMed, setShowSocMed] = useState(false);

	const [showShareMessage, setShowShareMessage] = useState(false);

	const [resultData, setResultData] = useState<any>(null);
	const [avatar, setAvatar] = useState<any>("")
	const [topText, setTopText] = useState<any>(null)
	const [bottomText, setBottomText] = useState<any>(null)

	const [showSessionError, setShowSessionError] = useState(false);

	const shareNow = () => {
		setShowSocMed(true)
	}

	const tryAgain = () => {
		if (coins <= 0) {
			setShowModalCoin(true);
		} else {
			setShowModalTryAgain(true)
		}
	}

	const closeTryAgain = () => {
		setShowModalTryAgain(false)
	}

	const onClickContinue = () => {
		setShowModalTryAgain(false)
		setTimeout(() => {
			cookies.remove('is-prompt-generate');
			router.replace("/");
		}, 100);
	}
	const closeModalCoin = () => {
		setShowModalCoin(false);
	}

	const onClickCoinOk = (): any => {
		window.open(common.helpSupport, "_blank")
		setTimeout(() => {
			setShowModalCoin(false);
		}, 100);
	}

	const closeSocMed = () => {
		setShowSocMed(false);
	}

	const onCloseSessionError = () => {
		setShowSessionError(false)
	}

	useEffect(() => {
		const getSavedPrompt = async (user_id: any = '') => {
			if (!user_id) {
				cookies.remove('is-prompt-generate');
				router.replace("/");
				return;
			}

			try {
				const res = await fetch(`api/getSavedPrompt/${user_id}`);

				const data = await res.json();
				if (data && data.error) {

				} else {
					if (data.status) {
						setResultData(data)
					} else {
						setShowSessionError(true)
					}
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		if (userID) {
			setShowShareMessage(true)
			getSavedPrompt(userID);
		} else {
			if (typeof window !== 'undefined') {
				let user_id: any = fn.localStorage.get('user_id');
				if (user_id) {
					getSavedPrompt(user_id);
				}
			}
		}

		return () => {
			setShowShareMessage(false)
		}

	}, [cookies, userID, router])

	useEffect(() => {
		if (resultData) {
			setAvatar(resultData.image);

			setTopText(fn.truncateText(`${resultData.story}`, 'topText'))
			setBottomText(fn.truncateText(`${resultData.story}`, 'bottomText'))
		}
	}, [resultData, avatar])
	return (
		<>

			{showShareMessage ? <ShareMessage></ShareMessage> : ''}

			<Nav isShowSessionError={showSessionError} onCloseSessionError={onCloseSessionError}></Nav>

			<div className="content-page p-[15px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem] 2xl:w-[1200px] 2xl:mx-auto">

				<div className="w-[230px] h-[230px] max-w-[340px] mx-auto avatar relative 2xs:h-[339px] 2xs:w-[auto] rounded-[50%] border-solid border-[white] border-[2px] flex justify-center items-center mt-[10px] mb-[24px]">
					<Image priority={true} className="absolute top-0 right-0 bottom-0 left-0 h-[90%] w-[90%] m-auto 2xs:h-[300px] 2xs:w-[300px]" src={`/resources/bg/inner-border.svg`} alt="poster" width="300" height="300" />
					{
						avatar ?
							<Image
								style={{
									objectFit: 'cover',
								}}
								className="rounded-[50%] h-[75%] w-[75%] m-auto 2xs:h-[230px] 2xs:w-[230px] object-cover" src={avatar} alt="avatar" width="230" height="230" />
							: null
					}
				</div>

				<div
					style={{
						textShadow: '-6px 0px 0px rgba(242, 77, 77, 1)',
						letterSpacing: '2px'

					}}
					className="mb-[10px] min-h-[81px] font-mona-sans-extra-bold text-primary-4 font-extrabold text-center md:pt-[2rem] text-[40px] leading-[40px] 4xs:text-[40px] 4xs:leading-[45px] 2xs:text-[50px] 2xs:leading-[50px] xs:text-[61px] xs:leading-[61px] md:text-[81px] md:leading-[81px]">
					{
						resultData ?
							<p>{resultData.tribe}</p>
							: null
					}
				</div>

				<div className="flex justify-center items-center">
					<Image className="" src={`/resources/line-breaker.png`} alt="poster" width="91" height="18" />
				</div>


				<div className="relative font-mona-sans-bold font-bold text-[#A62C3A] text-center text-[14px] indent-[10px] px-[5px] pt-[20px] mb-[2rem]">
					<Image
						className="absolute top-[5px] left-[1rem] 2xs:left-[2rem] sm:left-[6rem] md:left-[8rem] lg:left-[10rem]"
						src={`/resources/quote.svg`} alt="qoute" width="56" height="56" />
					<p className="block px-[5px]">{
						resultData ?
							resultData.quote : ''}</p>
				</div>

				<div className="content-data px-[12px] pt-[12px] pb-[24px] mb-[32px]">
					<div className="mt-[10px] xs:px-[2rem] md:px-[4rem] md:pt-[1.5rem] md:pb-[2rem] lg:px-[8rem] xl:px-[6rem]">
						<div className="min-h-[81px] font-brooklyn font-normal text-[14px] text-primary-6">
							{
								resultData ?
									<p>{topText}</p>
									: null
							}
						</div>

						<div className="image-text-content mt-[16px] pl-[18px]">
							<Video></Video>
							{
								bottomText ?
									<p className="pt-[16px] font-brooklyn font-normal text-[14px] text-primary-6">{bottomText}</p>
									:
									null
							}
						</div>

					</div>
				</div>

				{!showShareMessage ?

					<div className="actions sm:w-[70%] md:w-[50%] sm:mx-auto">
						<div className="mb-[16px]">
							<CustomButton
								height={`55px`}
								boxShadow={`-7px`}
								title={`Share Now`}
								isActive={true}
								onClicked={shareNow}
							></CustomButton>
						</div>

						<div>
							<CustomButton
								background={`#F9F6F6`}
								height={`54px`}
								boxShadow={`-7px`}
								title={`Try Again`}
								onClicked={tryAgain}
							></CustomButton>
						</div>

					</div>
					:
					''}

			</div>

			{!showShareMessage ?

				<div>
					<Modal
						showModal={showModalTryAgain}
						closeModal={closeTryAgain}>

						<Image
							className="cursor-pointer absolute top-[-15px] right-0"
							onClick={() => { closeTryAgain() }}
							src={`/resources/exit.svg`} alt="exit" width="24" height="24" />
						<div className="modal-header text-center mb-[28px] mt-[15px]">
							<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Generate Another Character</div>
						</div>

						<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
							<p>Do you want to create a character again? 8 credits are taken out of your account each time a character is recreated.</p>
						</div>

						<div className="modal-footer">
							<CustomButton
								height={`48px`}
								boxShadow={`-7px`}
								title={`Confirm`}
								isActive={true}
								onClicked={onClickContinue}
							></CustomButton>
						</div>
					</Modal>

					<Modal
						showModal={showModalCoin}
						closeModal={closeModalCoin}>
						<div className="modal-header text-center mb-[28px]">
							<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Uh-Oh, Not Enough Credit</div>
						</div>

						<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
							<p>{`You don’t have enough credit to generate your character. Please contact VANA support.`}</p>
						</div>

						<div className="modal-footer">
							<CustomButton
								height={`48px`}
								boxShadow={`-7px`}
								title={`Contact VANA Support`}
								isActive={true}
								onClicked={onClickCoinOk}
							></CustomButton>
						</div>
					</Modal>

					<ModalBottom showModal={showSoCMed} closeModal={closeSocMed}></ModalBottom>
				</div>
				:
				''
			}

			<HelpSupport></HelpSupport>

		</>
	)
}
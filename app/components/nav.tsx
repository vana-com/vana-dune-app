"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import { CustomButton, Modal } from "./components";
import { useSearchParams } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { fn } from '../utils/fn';
import { common } from "../utils/common";

export function Nav(prop: any) {
	const cookies = useCookies();

	const { isShowAttention, onCloseAttention, isShowSessionError, onCloseSessionError } = prop;

	const searchParams = useSearchParams()
	const guestToken = searchParams.get('user_id'); // for the guest

	const router: any = useRouter();
	const pathname = usePathname();

	let oldCoins: any = 0;
	oldCoins = fn.localStorage.get('user_balance') ? fn.localStorage.get('user_balance') : 0;


	const [coins, setCoins] = useState(oldCoins);
	const [coinDecuctValue, setCoinDeduct] = useState(8);
	const [showBack, setShowBack] = useState(false);
	const [showCoins, setShowCoins] = useState(false);

	const [showModalCoin, setShowModalCoin] = useState(false);
	const [showModalLowCoin, setShowModalLowCoin] = useState(false);

	const [showModalAttention, setShowModalAttention] = useState(false);
	const [showSessionError, setShowSessionError] = useState(false);
	const [showAPIError, setShowAPIError] = useState(false);
	const [APIErrorMsg, setAPIErrorMsg] = useState("");

	const [hasAttentionURL, setHasAttentionURL] = useState<any>([
		'/questions',
		'/result',
		'/loading',
	]);

	const removeCredentials = () => {
		cookies.remove('_code');
		cookies.remove('_code_verifier');
		cookies.remove('_scope');
		cookies.remove('_state');
		cookies.remove('_token');

		fn.localStorage.remove('user_id');
		fn.localStorage.remove('user_balance');
	}

	const goBack = () => {
		if (hasAttentionURL.includes(pathname)) {
			setShowModalAttention(true);
		} else {
			router.replace("/");
		}
	}

	const goLogin = () => {
		removeCredentials();
		router.replace("/");
		setTimeout(() => {
			setShowSessionError(false);
		}, 150);
	}

	const closeShowSessionError = () => {
		removeCredentials();
		setTimeout(() => {
			setShowSessionError(false)
		}, 100);
	}

	const closeApiError = () => {
		removeCredentials();

		setAPIErrorMsg("")
		router.replace("/");
		setTimeout(() => {
			setShowAPIError(false);
		}, 150);
	}


	const handleShowCoins = () => {
		console.log("coins", coins)
		if (coins < 8) {
			setShowModalLowCoin(true);
		} else {
			setShowModalCoin(true);
		}
	}

	const closeModalCoin = () => {
		setShowModalCoin(false);
	}

	const closeModalLowCoin = () => {
		setShowModalLowCoin(false)
	}

	const onClickLowCoinOk = () => {
		window.open(common.helpSupport, "_blank")
		setTimeout(() => {
			setShowModalLowCoin(false);
		}, 100);
	}

	const onClickCoinOk = () => {
		setTimeout(() => {
			setShowModalCoin(false);
		}, 100);
	}

	const onClickContinue = () => {
		setTimeout(() => {
			router.replace("/");
		}, 100);
	}

	const closeAttention = () => {
		setShowModalAttention(false);
		if (onCloseAttention) {
			onCloseAttention();
		}
	}

	useEffect(() => {
		// console.log(`Route changed to: ${pathname}`);

		const code: any = searchParams.get('code');
		const scope: any = searchParams.get('scope');
		const state: any = searchParams.get('state');

		const expiryDate: any = fn.getCookieExpiryDate(3);
		let interval: any = null;

		const reqOathToken = async () => {
			try {
				const res = await fetch('api/getOathToken', {
					method: "POST",
				});
				const data = await res.json();

				if (data && data.error) {
					setShowSessionError(true);
				} else {
					if (data.status) {
						document.cookie = `_token=${data.access_token ? data.access_token : ''}; expires=${expiryDate}; path=/`;
						fn.localStorage.set('user_id', data.user_id)
						if (code || scope || state) {
							router.replace("/questions");
						}
					} else {
						router.push("/error");
					}
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		const reqGetBalance = async () => {
			try {
				const res = await fetch('api/getBalance', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${cookies.get('_token') ? cookies.get('_token') : ''}`,
					},
				});

				const data = await res.json();

				if (data && data.error) {
					// if not landing page dont show
					if (pathname != '/') {
						setShowSessionError(true)
					}
				} else {
					if (data.status) {
						setCoins(data.balance ? data.balance : 0);
					} else {
						setCoins(0);

						setAPIErrorMsg(data.message)
						setTimeout(() => {
							setShowAPIError(true);
						}, 250);
					}

					fn.localStorage.set('user_balance', data.balance ? data.balance : 0)
				}
			} catch (error) {
				console.log("error", error)
			}
		}

		const setCredentials = () => {

			if (!code || !scope || !state) {
				if (cookies.get('_token')) {
					reqGetBalance();
					interval = setInterval(() => {
						reqGetBalance();
					}, 15000)
				} else {
					// if not landing page dont show
					if (pathname != '/') {
						setShowSessionError(true)
					}
				}
				return;
			}

			document.cookie = `_code=${code}; expires=${expiryDate}; path=/`;
			document.cookie = `_scope=${scope}; expires=${expiryDate}; path=/`;
			document.cookie = `_state=${state}; expires=${expiryDate}; path=/`;

			setTimeout(() => {
				reqOathToken();
			}, 100);
		}

		if (hasAttentionURL.includes(pathname)) {
			if (!guestToken) {
				setCredentials();
			}
		}

		return () => {
			clearInterval(interval);
		}
	}, [pathname, searchParams, router, cookies, hasAttentionURL, guestToken])

	useEffect(() => {
		if (guestToken) {

		} else {
			if (pathname != '/') {
				setShowBack(true);
				setShowCoins(true);
			} else {
				setShowBack(false);
				setShowCoins(true);
			}

			setShowModalCoin(false);
		}
	}, [guestToken, pathname])

	useEffect(() => {
		setShowModalAttention(isShowAttention);
	}, [isShowAttention])

	useEffect(() => {
		setShowSessionError(isShowSessionError);
	}, [isShowSessionError])

	return (
		<div className={`relative z-20 2xl:w-[1200px] 2xl:mx-auto`}>
			<div className="flex justify-center items-center px-[16px] pt-[6px]">
				{showBack ?
					<div className="sm:left-[4rem] md:left-[6rem] lg:left-[8rem] xl:left-[10rem] absolute left-[16px] top-[10px] cursor-pointer" onClick={() => { goBack() }}>
						<Image src={`/resources/arrow-left-default.svg`} alt="arrow-back" width="20" height="20" />
					</div>
					:
					''
				}

				<div>
					<Image priority={true} src={`/resources/emblem.png`} alt="Emblem" width="56" height="56" />
				</div>

				{showBack && showCoins ?
					<div className="sm:right-[4rem] md:right-[6rem] lg:right-[8rem] xl:right-[10rem] font-mona-sans-bold font-bold text-primary-1 text-[18px] absolute right-[16px] top-[10px] cursor-pointer flex items-center" onClick={() => { handleShowCoins() }}>
						<span className="mr-[6px]">{coins}</span>
						<Image src={`/resources/token-default.svg`} alt="coins" width="16" height="16" />
					</div>
					:
					''
				}
			</div>
			<Modal
				minH={''}
				showModal={showModalCoin}
				closeModal={closeModalCoin}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-semibold text-[12px] mb-[12px]">YOUR CREDITS</div>
					<div className="flex items-center justify-center font-mona-sans-bold font-bold text-primary-1 text-[32px] leading-[32px]">
						<span className="mr-[12px]">{coins}</span>
						<Image src={`/resources/token-default.svg`} alt="coins" width="28" height="28" />
					</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
					<p>Each time character is generated, {coinDecuctValue} credits are taken out of your account.</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Okay`}
						isActive={true}
						arrowPos={`right`}
						onClicked={onClickCoinOk}
					></CustomButton>
				</div>
			</Modal>

			<Modal
				minH={''}
				showModal={showModalAttention}
				closeModal={closeAttention}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Attention!</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
					<p>We could not restore your progress. If you proceed now, your progress will be reset.</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Continue`}
						isActive={true}
						onClicked={onClickContinue}
					></CustomButton>
				</div>
			</Modal>

			<Modal
				minH={''}
				isCloseOnOverlayClick={false}
				showModal={showSessionError}
				closeModal={closeShowSessionError}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Your Session Has Expired!</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
					<p>Please log in again to continue using the app.</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Log in`}
						isActive={true}
						onClicked={goLogin}
					></CustomButton>
				</div>
			</Modal>

			<Modal
				minH={''}
				showModal={showAPIError}
				isCloseOnOverlayClick={false}
				closeModal={closeApiError}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Attention!</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px] min-h-[50px]">
					<p>{APIErrorMsg ? APIErrorMsg : ''}</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Okay`}
						isActive={true}
						onClicked={closeApiError}
					></CustomButton>
				</div>
			</Modal>


			<Modal
				minH={''}
				showModal={showModalLowCoin}
				closeModal={closeModalLowCoin}>
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
						onClicked={onClickLowCoinOk}
					></CustomButton>
				</div>
			</Modal>
		</div>
	)
}
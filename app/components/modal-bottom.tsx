"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { fn } from '../utils/fn';

// https://github.com/nygardk/react-share?tab=readme-ov-file
import {
	FacebookShareButton,
	TwitterShareButton,
} from "react-share";
import { CustomButton, Modal } from "./components";

export function ModalBottom(prop: any) {
	const { children, showModal, closeModal, confirmModal, minH } = prop;

	const [open, setOpen] = useState(false);
	const [windowUrl, setWindowUrl] = useState("");

	const [fbUrl, setFbUrl] = useState("");
	const [twitterUrl, setTwitterUrl] = useState("");
	const [twitterTitle, setTwitterTitle] = useState("\n");
	const [showSuccessSaved, setShowSuccessSaved] = useState(false);
	const [isSuccessDownload, setIsSuccessDownload] = useState(false);
	const [isMobile, setIsMobile] = useState<boolean>(false)

	let saveImageInterval: any = null
	let user_id: any = null;
	if (fn.localStorage.get('user_id')) user_id = fn.localStorage.get('user_id');

	const closeSucessSaved = () => {
		setShowSuccessSaved(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	let count: number = 0;
	const handleCloseModal = () => {
		setOpen(false);
		closeModal(false);
	};

	const handleConfirmModal = () => {
		setOpen(false);
		confirmModal();
	};

	const openSaveImage = () => {
		fn.localStorage.remove("download-success")
		count = 0;
		clearInterval(saveImageInterval)

		if (isMobile || fn.getMobileOperatingSystem() == 'iOS') {
			if (fn.getMobileOperatingSystem() == 'iOS') {
				clearInterval(saveImageInterval)
				return
			} else {
				if (fn.checkBrowserType() == 'Firefox') {
					clearInterval(saveImageInterval)
					return
				} else {

				}
			}
		} else {
			// if (fn.checkBrowserType() == 'Firefox') {

			// } else {

			// }
		}


		saveImageInterval = setInterval(() => {
			if (fn.localStorage.get("download-success")) {
				if (fn.localStorage.get("download-success") == "1") {
					setIsSuccessDownload(true)
				} else {
					setIsSuccessDownload(false)
				}
				fn.localStorage.remove("download-success")
				setShowSuccessSaved(true);
				clearInterval(saveImageInterval)
				// console.log("download complete")
			} else {
				count = count + 500;
				// console.log("download in-progress", count)
				if (count >= 15000) {
					// console.log("download timeout")
					clearInterval(saveImageInterval)
				}
			}
		}, 500)
	}

	useEffect(() => {
		setIsMobile(fn.isMobile())
		fn.localStorage.remove("download-success")

		setOpen(showModal);
		if (typeof window !== 'undefined') {
			let user_id: any = fn.localStorage.get('user_id');

			let url: string = process.env.NEXT_PUBLIC_BASE_URL + 'result' ?? window.location.href;

			setWindowUrl(`${url}?user_id=${user_id}`)
			setFbUrl(`${url}?user_id=${user_id}`)
			setTwitterUrl(`${url}?user_id=${user_id}`)

			// setTwitterTitle(`SANDS OF ARRAKIS \nEmbark on the Journey Through the Sands of Fate: Discover Your Inner Dune Character \n\n`)
		}

	}, [showModal]);

	useEffect(() => {
		return () => {
			clearInterval(saveImageInterval)
		}
	}, [saveImageInterval])

	return (
		<>
			<div className={`share-modal-wrapper ${open ? 'share-modal-show' : 'share-modal-hidden'}`}>
				<div className="font-mona-sans-bold font-bold text-[18px] text-primary-6 flex justify-between items-center mb-[16px] md:px-[6rem] lg:px-[8rem] xl:px-[10rem] 2xl:w-[1200px] 2xl:mx-auto">
					<div>Share to</div>
					<Image
						className="cursor-pointer"
						onClick={() => { handleCloseModal() }}
						src={`/resources/exit.svg`} alt="exit" width="24" height="24" />
				</div>

				<div className="socMedia-list font-brooklyn font-semibold text-[10px] flex items-center flex-wrap md:px-[6rem] lg:px-[8rem] xl:px-[10rem] 2xl:w-[1200px] 2xl:mx-auto">

					<div className="socMedia-item text-center">
						<Link href="/exportimage?saveImage=1" target="_blank" onClick={() => {
							openSaveImage();
						}}>
							<div className="bg-[#A8DADC] socMedia-icon-box flex items-center justify-center rounded-[50%] mx-auto mb-[10px]">
								<Image src={`/resources/socmed/download.svg`} alt="download" width="24" height="24" />
							</div>
							<div className="min-h-[30px]">Save Image</div>
						</Link>
					</div>

					{/* 
						instagram issue

						https://developers.facebook.com/docs/instagram
						https://developers.facebook.com/docs/instagram/sharing-to-stories
						https://stackoverflow.com/questions/69100154/share-to-instagram-feed-using-javascript

					 */}

					{/* <div className="socMedia-item text-center">
						<div
							onClick={() => {
								socialShare()
							}}
							style={{
								'background': 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
							}}
							className="bg-[#A8DADC] socMedia-icon-box flex items-center justify-center rounded-[50%] mx-auto mb-[10px]">
							<Image src={`/resources/socmed/instagram-post.svg`} alt="instragram-post" width="24" height="24" />
						</div>
						<div className="min-h-[30px]">Instagram Post</div>
					</div>

					<div className="socMedia-item text-center">
						<div
							style={{
								'background': 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
							}}
							className="bg-[#A8DADC] socMedia-icon-box flex items-center justify-center rounded-[50%] mx-auto mb-[10px]">
							<Image src={`/resources/socmed/instagram-stories.svg`} alt="instragram-stories" width="24" height="24" />
						</div>
						<div className="min-h-[30px]">Instagram Stories</div>
					</div> */}

					<div className="socMedia-item text-center">
						<TwitterShareButton
							url={twitterUrl}
							title={twitterTitle}
						>
							<div className="bg-[#A8DADC] socMedia-icon-box flex items-center justify-center rounded-[50%] mx-auto mb-[10px]">
								<Image src={`/resources/socmed/twitter.svg`} alt="instragram-stories" width="40" height="40" />
							</div>
							<div className="min-h-[30px]">X</div>
						</TwitterShareButton>
					</div>

					<div className="socMedia-item text-center">
						<FacebookShareButton url={fbUrl}>
							<div className="bg-[#A8DADC] socMedia-icon-box flex items-center justify-center rounded-[50%] mx-auto mb-[10px]">
								<Image src={`/resources/socmed/fb.svg`} alt="instragram-stories" width="40" height="40" />
							</div>
							<div className="min-h-[30px]">Facebook Post</div>
						</FacebookShareButton>
					</div>

				</div>
			</div>

			<Modal
				showModal={showSuccessSaved}
				closeModal={closeSucessSaved}>
				<div className="modal-header text-center mb-[28px]">
					<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Save Image</div>
				</div>

				<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
					<p>{!isSuccessDownload ? `Image download failed. Retry again.` : `Image has been saved.`}</p>
				</div>

				<div className="modal-footer">
					<CustomButton
						height={`48px`}
						boxShadow={`-7px`}
						title={`Okay`}
						isActive={true}
						onClicked={closeSucessSaved}
					></CustomButton>
				</div>
			</Modal>
		</>
	)
}

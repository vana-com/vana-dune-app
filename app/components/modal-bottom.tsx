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

export function ModalBottom(prop: any) {
	const { children, showModal, closeModal, confirmModal, minH } = prop;

	const [open, setOpen] = useState(false);
	const [windowUrl, setWindowUrl] = useState("");

	const [fbUrl, setFbUrl] = useState("");
	const [twitterUrl, setTwitterUrl] = useState("");
	const [twitterTitle, setTwitterTitle] = useState("");

	let user_id: any = null;
	if (fn.localStorage.get('user_id')) user_id = fn.localStorage.get('user_id');

	const openModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		closeModal(false);
	};

	const handleConfirmModal = () => {
		setOpen(false);
		confirmModal();
	};

	const socialShare = () => {
		// if (navigator) {
		// 	let url: string = process.env.NEXT_PUBLIC_BASE_URL + '/result' ?? window.location.href;

		// 	navigator.share({
		// 		title: 'test',
		// 		text: '123',
		// 		url: url
		// 	}).then((res) => {
		// 		console.log("res", res)

		// 	}).catch((err) => {
		// 		console.error("err", err)
		// 	})
		// }
	}

	useEffect(() => {
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
	}, [windowUrl])

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
						<Link href="/exportimage?saveImage=1" target="_blank">
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
							title={twitterTitle}
							url={twitterUrl}>
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
		</>
	)
}

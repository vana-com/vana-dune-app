import dynamic from 'next/dynamic';

const CustomButton = dynamic(() => import('./custom-button').then((mod) => mod.CustomButton), {
	ssr: false,
})

const FrameAnimate = dynamic(() => import('./frame-animate').then((mod) => mod.FrameAnimate), {
	ssr: false,
})

const HelpSupport = dynamic(() => import('./help-support').then((mod) => mod.HelpSupport), {
	ssr: false,
})

const Modal = dynamic(() => import('./modal').then((mod) => mod.CustomModal), {
	ssr: false,
})

// const Nav = dynamic(() => import('./nav').then((mod) => mod.Nav), {
// 	ssr: false,
// })

const ModalBottom = dynamic(() => import('./modal-bottom').then((mod) => mod.ModalBottom), {
	ssr: false,
})

const SwiperSlider = dynamic(() => import('./swiper').then((mod) => mod.SwiperSlider), {
	ssr: false,
})

const Video = dynamic(() => import('./video').then((mod) => mod.Video), {
	ssr: false,
})

// const ShareMessage = dynamic(() => import('./share-message').then((mod) => mod.ShareMessage), {
// 	ssr: false,
// })

import { Nav } from "./nav";

import { ShareMessage } from "./share-message";

export {
	CustomButton,
	FrameAnimate,
	HelpSupport,
	Modal,
	Nav,
	ModalBottom,
	ShareMessage,
	SwiperSlider,
	Video
}
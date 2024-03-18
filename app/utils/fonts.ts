// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
import localFont from "next/font/local";

/** Reference for Mona sans and font weights
 * Link: https://github.com/github/mona-sans/tree/v1.0.1
 * Link for font weights: https://tailwindcss.com/docs/font-weight
 */

const monaSans = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/Mona-Sans.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans'
})

const brooklyn = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/Brooklyn-Normal.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-brooklyn'
})

const duneRise = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/Dune-Rise.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-dune-rise'
})

const MonaSanExp_Regular = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/expanded/MonaSansExpanded-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans-regular'
})

const MonaSanExp_Medium = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/expanded/MonaSansExpanded-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans-medium'
})

const MonaSanExp_SemiBold = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/expanded/MonaSansExpanded-SemiBold.woff2',
			weight: '600',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans-semibold'
})

const MonaSanExp_Bold = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/expanded/MonaSansExpanded-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans-bold'
})

const MonaSanExp_ExtraBold = localFont({
	src: [
		// default
		{
			path: '../../public/fonts/expanded/MonaSansExpanded-ExtraBold.woff2',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--font-mona-sans-extra-bold'
})

const AvenyTWeb = localFont({
	src: [
		// default
		{
			// path: '../../public/fonts/Aveny-T-WEB.woff2',
			path: '../../public/fonts/FontsFree-Net-Aveny-T-WEB.ttf',
			weight: '500',
			style: 'normal',
		},
	],
	variable: '--font-aveny-t-web'
})

export {
	monaSans,
	brooklyn,
	duneRise,
	MonaSanExp_Regular,
	MonaSanExp_Medium,
	MonaSanExp_SemiBold,
	MonaSanExp_Bold,
	MonaSanExp_ExtraBold,
	AvenyTWeb
};
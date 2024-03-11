import type { Metadata } from "next";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./styles/globals.css";
import "./styles/media.css";
import "./styles/frameanimate.css";
import "./styles/swiper.css";

import 'react-responsive-modal/styles.css';
import {
	monaSans,
	brooklyn,
	duneRise,
	MonaSanExp_Regular,
	MonaSanExp_Medium,
	MonaSanExp_SemiBold,
	MonaSanExp_Bold,
	MonaSanExp_ExtraBold,
	AvenyTWeb
} from "./utils/fonts";
import { CookiesProvider } from 'next-client-cookies/server';

import { common } from "./utils/common";

import { Suspense } from "react";
import { NavigationEvents } from './components/navigation-events'
import Loading from "./loading/page";
export const metadata: Metadata = {
	title: "Sands Of Arrakis",
	description: "Sands Of Arrakis Template",
	keywords: ['Sands Of Arrakis', 'Vana AI', 'Vana The Template'],
	metadataBase: new URL(`${common.domain}`),
	openGraph: {
		title: 'Sands Of Arrakis',
		description: 'Embark on the Journey Through the Sand of Fate: Discover Your Inner Dune Character',
		url: common.domain,
		siteName: '@sandofarrakis',
		images: [
			{
				url: '/favicon-social-media.png', // Must be an absolute URL
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		title: 'Sands Of Arrakis',
		description: 'Embark on the Journey Through the Sand of Fate: Discover Your Inner Dune Character',
		card: 'summary_large_image',
		images: [
			{
				url: '/favicon-social-media.png', // Must be an absolute URL
				width: 1200,
				height: 630,
			},
		],
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	// add white space when adding new font variable
	const fontVariables = `${monaSans.variable} ${brooklyn.variable} ${duneRise.variable} ${MonaSanExp_Regular.variable} ${MonaSanExp_Medium.variable} ${MonaSanExp_SemiBold.variable} ${MonaSanExp_Bold.variable} ${MonaSanExp_ExtraBold.variable} ${AvenyTWeb.variable}`;
	const tailwindClasses = `font-normal min-h-[100vh]`;

	return (
		<html lang="en">
			<body className={`${fontVariables} ${tailwindClasses}`}>
				<CookiesProvider>
					{children}

					<Suspense fallback={<Loading></Loading>}>
						<NavigationEvents />
					</Suspense>

				</CookiesProvider>
			</body>
		</html>
	);
}

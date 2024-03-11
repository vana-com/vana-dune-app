import type { Config } from "tailwindcss";

/** Reference for tailwind colors
 * Link: https://tailwindcss.com/docs/text-color
 */ 

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'default': "linear-gradient(180deg, #C6918B, #FBD7BD)",
				'layer-1': "url('/resources/bg/layer-1.svg')",
				'layer-2': "url('/resources/bg/layer-2.svg')",
				'layer-3': "url('/resources/bg/layer-3.svg')",
				'fog': "url('/resources/bg/fog.png')",
				'sub-layer-1': "url('/resources/bg/sub-layer-1.svg')",
				'sub-layer-2': "url('/resources/bg/sub-layer-2.png')",
				'sub-layer-3': "url('/resources/bg/sub-layer-3.png')",
				'sand-layer-1': "url('/resources/bg/sand-layer-1.png')",
				'sand-layer-2': "url('/resources/bg/sand-layer-2.png')",
				'fog-2': "url('/resources/bg/fog-2.png')",
			}),
			animation: {
				'ltr-linear-infinite': 'ltr-linear-infinite 100s linear infinite',
			},
			keyframes: {
				'ltr-linear-infinite': {
					'from': { 'background-position': '0 0' },
					'to': { 'background-position': '400% 0%' },
				},
			},
			colors: {
				// colors from tailwind
				...colors,

				// primary background colors
				'primary-bg-1': '#804420',
				'primary-bg-2': '#a76533',
				'primary-bg-3': '#f09055',
				'primary-bg-4': '#efa476',
				'primary-bg-5': '#f4b690',
				// secondary background colors
				'secondary-bg-1': '#9b9fab',
				'secondary-bg-2': '#bcc1d1',
				'secondary-bg-3': '#e1e3eb',
				// Accent
				'accent-bg-1': '#48c1b8',
				'accent-bg-2': '#d34e66',
				'accent-bg-3': '#ec6a6a',
				'accent-bg-4': '#f79e7b',

				// btn-bg
				'btn-1': '#A8DADC',

				// Custom text colors
				'primary-1': '#373737',
				'primary-2': '#2A2A2A',
				'primary-3': '#363636',
				'primary-4': '#EC6A6A',
				'primary-5': '#F24D4D',
				'primary-6': '#040404',
			},
		},
		fontFamily: {
			'mona-sans': ['var(--font-mona-sans)'],
			'brooklyn': ['var(--font-brooklyn)'],
			'dune-rise': ['var(--font-dune-rise)'],
			'mona-sans-regular': ['var(--font-mona-sans-regular)'],
			'mona-sans-medium': ['var(--font-mona-sans-medium)'],
			'mona-sans-semibold': ['var(--font-mona-sans-semibold)'],
			'mona-sans-bold': ['var(--font-mona-sans-bold)'],
			'mona-sans-extra-bold': ['var(--font-mona-sans-extra-bold)'],
			'aveny': ['var(--font-aveny-t-web)'],
		},
		screens: {

			/** Reference for common view port of devices
			 * Link: https://ricostacruz.com/posts/css-media-query-breakpoints#viewport-widths-of-common-devices
			 **/ 

			// for mobile first method
			'4xs': '320px',
			// => @media (min-width: 320px) { ... }

			'2xs': '375px',
			// => @media (min-width: 375px) { ... }

			// for mobile first method
			'xs': '425px',
			// => @media (min-width: 425px) { ... }

			'sm': '767px',
			// => @media (min-width: 767px) { ... }

			'md': '1023px',
			// => @media (min-width: 1023px) { ... }

			'lg': '1199px',
			// => @media (min-width: 1199px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1200px) { ... }

			'2xl': '1366px',
			// => @media (min-width: 1366px) { ... }
		},
	},
	plugins: [],
};
export default config;

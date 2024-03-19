/** Reference for NextJS middleware
 * Link: https://nextjs.org/docs/app/building-your-application/routing/middleware
 * 
 * Relative URLs
 * Link: https://nextjs.org/docs/messages/middleware-relative-urls
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	try {
		let codeVerifier = request.cookies.get('_code_verifier');

		let currentUrl = request.url;

		if (!codeVerifier && currentUrl.includes("/questions")) {
			return NextResponse.redirect(new URL('/', request.url))
		}

		if (!codeVerifier && currentUrl.includes("/loading")) {
			return NextResponse.redirect(new URL('/', request.url))
		}

		if (codeVerifier && currentUrl.includes("/loading")) {
			let isPromptGenerate = request.cookies.get('_is-prompt-generate');
			let isClickDiscover = request.cookies.get('is-clicked-discover');
			if (isPromptGenerate && isClickDiscover) {
				return NextResponse.next();
			} else {
				return NextResponse.redirect(new URL('/', request.url))
			}
		}

		return NextResponse.next()
	} catch (error) {
		throw new Error("Error: Middleware")
	}
}
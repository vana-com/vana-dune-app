'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { fn } from '../utils/fn';
export function NavigationEvents() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const cookies = useCookies();
	const router = useRouter();

	useEffect(() => {
		const reqGetPrompt = async () => {
			cookies.set('is-prompt-generate', '1');
			try {
				const res = await fetch('api/getPrompt', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${cookies.get('_token') ? cookies.get('_token') : ''}`,
					},
				});

				const data = await res.json();

				if (data && data.error) {

				} else {
					if (data.status) {
						console.log("data", data)
					} else {
						// todo: when not enough balance, add action not to able to visit the result page with it.
					}
				}
			} catch (error) {
				console.log("error", error);
			}
		}

		if (['/questions'].includes(pathname)) {
			const code = searchParams.get('code');
			if (cookies.get('_token') && !cookies.get('is-prompt-generate')) {
				if (!code) {
					reqGetPrompt();
				}
			} else {
				if (!code) {
					console.log("redirect to login")
					router.push("/")
				}
			}
		}

		if (['/result'].includes(pathname)) {
			if (cookies.get('is-prompt-generate')) {

			} else {
				const guestToken = searchParams.get('user_id'); // for the guest
				if (guestToken) {
					cookies.remove('is-prompt-generate');
				} else {
					router.push("/")
				}
			}
		}
		return () => { }
	}, [pathname, searchParams, cookies, router])

	return null
}
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
			const expiryDate: any = fn.getCookieExpiryDate(3);
			document.cookie = `_is-prompt-generate=true;expires=${expiryDate};path=/;SameSite=None;Secure`;
			try {
				const res = await fetch('api/getPrompt', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${cookies.get('_token') ? cookies.get('_token') : ''}`,
					},
				});

				const data = await res.json();
				if (data && data.error || data.error) {
					fn.localStorage.set("prompt-error", "1")
					// fn.localStorage.remove("prompt-error")
					// router.push("/error")
				} else {
					if (data.status) {
						fn.localStorage.remove("prompt-error")
					} else {
						if (data.isCharacter) {
							fn.localStorage.remove("prompt-error")
							router.push("/error")
						} else {
							if (!data.story || !data.tribe) {
								fn.localStorage.set("prompt-error", "1")
							}
						}
					}
				}
			} catch (error) {
				console.log("error", error);
			}
		}

		if (['/questions'].includes(pathname)) {
			const code = searchParams.get('code');
			if (cookies.get('_token') && !cookies.get('_is-prompt-generate')) {
				if (!code) {
					reqGetPrompt();
				}
			} else {
				if (!code) {
					router.push("/")
				}
			}
		}

		if (['/result'].includes(pathname)) {
			if (cookies.get('_is-prompt-generate')) {

			} else {
				const guestToken = searchParams.get('user_id'); // for the guest
				if (guestToken) {
					cookies.remove('_is-prompt-generate');
				} else {
					router.push("/")
				}
			}
		}
		return () => { }
	}, [pathname, searchParams, cookies, router])

	return null
}
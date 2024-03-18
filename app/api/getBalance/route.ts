import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'

import { data } from ".."
import { api } from "../api"
export async function GET() {

	let data: any = {
		"status": true,
		"balance": 126,
	};

	// let data: any = {
	// 	"error": {
	// 		"status": 0,
	// 		"statusText": "Error requesting https://backend.beta.sandsofarrakis.me/api/users/balance"
	// 	}
	// };

	return NextResponse.json(data)
	const cookieStore = cookies()
	const url = `${data.api_url}${api.getBalance}`;

	try {
		const token: any = cookieStore.get('_token')
		const result = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token.value ? token.value : ''}`,
			},
		})
		const jsonData = await result.json()

		return NextResponse.json(jsonData)
	} catch (error) {
		return NextResponse.json(
			{
				error: {
					status: 0,
					statusText: `Error requesting ${url}`,
				}
			},
			{ status: 500 },
		)
	}

}
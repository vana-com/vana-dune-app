import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'

import { data } from ".."
import { api } from "../api"

export async function GET() {

	const cookieStore = cookies()
	const url = `${data.api_url}${api.getPrompt}`;

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
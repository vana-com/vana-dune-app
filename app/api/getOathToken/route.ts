import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'
import { data } from ".."
import { api } from "../api"

export async function POST(req: NextRequest, res: NextResponse) {

	const cookieStore = cookies()
	const url = `${data.api_url}${api.getOathToken}`;

	try {
		const code: any = cookieStore.get('_code')
		const code_verifier: any = cookieStore.get('_code_verifier')

		const result = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				code: code ? code.value : '',
				code_verifier: code_verifier ? code_verifier.value : '',
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		const jsonData = await result.json();

		return NextResponse.json(jsonData);
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

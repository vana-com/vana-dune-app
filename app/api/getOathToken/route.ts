import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'
import { data } from ".."
import { api } from "../api"

export async function POST(req: NextRequest, res: NextResponse) {

	// // start test
	// let data: any = {
	// 	"status": true,
	// 	"access_token": "ory_at_W9N-8ZiBOK0f_uXy7vSeK0H2eeDqNzjC743TmycVYVs.2VgwGPHhpFHZE5bEWftNCvywk_lprU5AvO7H3IH2EBw",
	// 	"user_id": "123456"
	// };

	// return NextResponse.json(data)
	// // end test

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

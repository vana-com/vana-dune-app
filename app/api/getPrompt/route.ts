import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'

import { data } from ".."
import { api } from "../api"
export async function GET() {

	// // start test
	// const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
	// await delay(5000)

	// // when fail
	// // let data: any = {
	// // 	"status": false,
	// // 	"isCharacter": true,
	// // 	"message": "HTTP request returned status code 404:\n{\"statusCode\":404,\"name\":\"ModelNotFoundException\",\"message\":\"Character 9667bf0b-061d-4816-9dd5-a8c40a848747 does not hav (truncated...)\n",
	// // };


	// // let data: any = {
	// // 	"status": false,
	// // 	"message": "HTTP request returned status code 500:\n{\"name\":\"Error\",\"message\":\"@vercel/edge-config: Edge Config not found\",\"errors\":[\"@vercel/edge-config: Edge Config not f (truncated...)\n"
	// // }

	// // let data: any = {
	// // 	"error": {
	// // 		"status": 0,
	// // 		"statusText": "Error requesting https://backend.beta.sandsofarrakis.me/api/users/generate-prompt"
	// // 	}
	// // }

	// let data: any = {
	// 	"status": true,
	// 	"story": "You're a Fremen, I'll name you \"Kuya Mara\". Like the Fremen, you're skilled in survival, thriving in life's harshest conditions. Your love for your family mirrors their strong community bonds, and your curiosity parallels their keen sense of awareness in the vast desert of life.",
	// 	"tribe": "Fremen",
	// 	"image_job_id": "780e7aa9-41db-4ed1-b3a0-850b013d20cc",
	// 	"image_file": "https://storage.googleapis.com/vana-gotchi-jobs-development/780e7aa9-41db-4ed1-b3a0-850b013d20cc%2Fout-0.png"
	// };

	// return NextResponse.json(data)
	// // end test

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
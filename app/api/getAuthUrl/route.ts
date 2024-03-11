import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto

import { data } from ".."
import { api } from "../api"

export async function GET(req: Request, res: Response) {

	// let temp_url = "https://51f9-180-191-16-36.ngrok-free.app";
	// let temp_url = "http://localhost:3000/";

	// let data: any = {
	// 	"status": true,
	// 	"url": temp_url+"/questions?code=ory_ac_0fpfAh3e0_M6U59tpbw8s-zJhmdyNsCXJyPjhVd9mNM.LJhZBqZ0NoMQNvhANCrQjcSXtE_f0t77GvOnlhHGzgo&scope=openid+offline&state=8f83f35d89a1c02b730de6296339956e",
	// 	"code_verifier": "ory_ac_0fpfAh3e0_M6U59tpbw8s-zJhmdyNsCXJyPjhVd9mNM.LJhZBqZ0NoMQNvhANCrQjcSXtE_f0t77GvOnlhHGzgo"
	// };

	// return NextResponse.json(data)

	const url = `${data.api_url}${api.getAuthUrl}`;
	try {
		const result = await fetch(url, {
			method: 'GET'
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

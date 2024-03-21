import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto

import { data } from ".."
import { api } from "../api"

export async function GET(req: Request, res: Response) {

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

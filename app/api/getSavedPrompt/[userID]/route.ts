import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto

import { data } from "../../index"
import { api } from "../../api"

/*WARNING: FOR TEST DATA ONLY*/
import { mockdata } from "@/mockdata"
/*END TEST*/

export async function GET(req: Request, { params }: any) {

	/*WARNING: FOR TEST DATA ONLY*/
	if (process.env.NODE_ENV === "development") return mockdata.getSavedPrompt();
	/*END TEST*/

	const user_id = params.userID;
	const url = `${data.api_url}${api.getSavedPrompt}/${user_id}`;
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

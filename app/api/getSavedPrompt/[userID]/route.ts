import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto

import { data } from "../../index"
import { api } from "../../api"

export async function GET(req: Request, { params }: any) {

	// 	let story = "You'd be a part of the Rakian Priesthood, named \"Father Ormiston.\" A spiritual leader, you're known for your affirming nature, often comforting the flock with tales of survival and resilience in Arrakis' harsh desert. Despite occasional memory lapses, your strong sense of duty guides you, ensuring the worship of sandworms as divine remains unwavering."
		
	// 	let data: any = {
	//     "status": true,
	//     "story": `${story}`,
	//     "tribe": "Rakian Priesthood",
	//     "quote": "\"*Amidst the shifting sands of Arrakis, Father Ormiston embarks on a profound pilgrimage, seeking the elusive Rakian Priesthood, his own tribe.*\"",
	//     "image_job_id": "ce11ef38-5bbb-4b5e-8ebd-c100f87d8fbd",
	//     // "image": "https://storage.googleapis.com/vana-gotchi-jobs-development/ce11ef38-5bbb-4b5e-8ebd-c100f87d8fbd%2Fout-0.png"
	//     "image": "https://storage.googleapis.com/vana-gotchi-jobs-development/780e7aa9-41db-4ed1-b3a0-850b013d20cc%2Fout-0.png"

	// };

	// return NextResponse.json(data)

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

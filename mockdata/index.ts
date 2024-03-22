import { NextResponse } from "next/server"

let temp_url = "http://localhost:3000/";
// let temp_url = "https://beta.sandsofarrakis.me/";
// let temp_url = "https://3c21-180-191-16-36.ngrok-free.app/";

const mockdata = {
	getAuthUrl: async () => {
		let data: any = {
			"status": true,
			"url": temp_url + "questions?code=ory_ac_0fpfAh3e0_M6U59tpbw8s-zJhmdyNsCXJyPjhVd9mNM.LJhZBqZ0NoMQNvhANCrQjcSXtE_f0t77GvOnlhHGzgo&scope=openid+offline&state=8f83f35d89a1c02b730de6296339956e",
			"code_verifier": "ory_ac_0fpfAh3e0_M6U59tpbw8s-zJhmdyNsCXJyPjhVd9mNM.LJhZBqZ0NoMQNvhANCrQjcSXtE_f0t77GvOnlhHGzgo"
		};
		return NextResponse.json(data)
	},
	getOathToken: async () => {
		let data: any = {
			"status": true,
			"access_token": "ory_at_W9N-8ZiBOK0f_uXy7vSeK0H2eeDqNzjC743TmycVYVs.2VgwGPHhpFHZE5bEWftNCvywk_lprU5AvO7H3IH2EBw",
			"user_id": "123456"
		};

		return NextResponse.json(data)
	},
	getBalance: async () => {
		// error balance
		// let data: any = {
		// 	"error": {
		// 		"status": 0,
		// 		"statusText": "Error requesting https://backend.beta.sandsofarrakis.me/api/users/balance"
		// 	}
		// };

		// has balance
		// note: min. balance should be 12
		let data: any = {
			"status": true,
			"balance": 100, // 0 // 12
		};

		return NextResponse.json(data)
	},
	getPrompt: async () => {
		// const delayTime = 5000; // can change to test
		const delayTime = 40000; // can change to test

		const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
		await delay(delayTime)

		// when fail
		// let data: any = {
		// 	"status": false,
		// 	"isCharacter": true,
		// 	"message": "HTTP request returned status code 404:\n{\"statusCode\":404,\"name\":\"ModelNotFoundException\",\"message\":\"Character 9667bf0b-061d-4816-9dd5-a8c40a848747 does not hav (truncated...)\n",
		// };

		// when fail
		// let data: any = {
		// 	"status": false,
		// 	"message": "HTTP request returned status code 500:\n{\"name\":\"Error\",\"message\":\"@vercel/edge-config: Edge Config not found\",\"errors\":[\"@vercel/edge-config: Edge Config not f (truncated...)\n"
		// }

		// when fail
		// let data: any = {
		// 	"error": {
		// 		"status": 0,
		// 		"statusText": "Error requesting https://backend.beta.sandsofarrakis.me/api/users/generate-prompt"
		// 	}
		// }

		let data: any = {
			"status": true,
			"story": "You're a Fremen, I'll name you \"Kuya Mara\". Like the Fremen, you're skilled in survival, thriving in life's harshest conditions. Your love for your family mirrors their strong community bonds, and your curiosity parallels their keen sense of awareness in the vast desert of life.",
			"tribe": "Fremen",
			"image_job_id": "780e7aa9-41db-4ed1-b3a0-850b013d20cc",
			"image_file": "https://storage.googleapis.com/vana-gotchi-jobs-development/780e7aa9-41db-4ed1-b3a0-850b013d20cc%2Fout-0.png"
		};

		return NextResponse.json(data)
	},

	getSavedPrompt: async () => {
		let story = "You'd be a part of the Rakian Priesthood, named \"Father Ormiston.\" A spiritual leader, you're known for your affirming nature, often comforting the flock with tales of survival and resilience in Arrakis' harsh desert. Despite occasional memory lapses, your strong sense of duty guides you, ensuring the worship of sandworms as divine remains unwavering."


		let data: any = {
			// "image": "https://storage.googleapis.com/vana-gotchi-jobs-development/1592d2bf-93a5-4eba-b088-3a1042203054%2Fout-0.png",
			// "quote": "💬 \"QuietSkeptic, seeking their place amidst the stars, whispered, 'I must find my tribe, my DUNE...or die trying.'\" 🌌🕵️‍♀️ #DuneInspired #FremenJourney",
			// "story": "QuietSkeptic, a solitary and analytical Fremen, navigates the unforgiving desert of Arrakis with a calm determination. Adapting to the harsh environment, they uncover secrets and new ideas, skeptically evaluating their worth. Like the Fremen, they are resourceful and discrete, excelling in survival skills and strategic thinking. Their enigmatic nature, cool sophistication, and mastery of disguise make them a formidable force in the universe of DUNE.",
			// "tribe": "Fremen",
			// "status": true,
			// "image_job_id": "1592d2bf-93a5-4eba-b088-3a1042203054",


			// "story": `${story}`,
			// "tribe": "Rakian Priesthood",
			// "quote": "\"*Amidst the shifting sands of Arrakis, Father Ormiston embarks on a profound pilgrimage, seeking the elusive Rakian Priesthood, his own tribe.*\"",
			// "image_job_id": "ce11ef38-5bbb-4b5e-8ebd-c100f87d8fbd",
			// // "image": "https://storage.googleapis.com/vana-gotchi-jobs-development/ce11ef38-5bbb-4b5e-8ebd-c100f87d8fbd%2Fout-0.png"
			// "image": "https://storage.googleapis.com/vana-gotchi-jobs-development/780e7aa9-41db-4ed1-b3a0-850b013d20cc%2Fout-0.png"


			"image": "https://storage.googleapis.com/vana-gotchi-jobs-development/1b0cf737-d68f-41fa-8f59-cdcab3208bef%2Fout-0.png",
			"quote": "\"I must find my place among the stars, my soul yearns for the tribe that will embrace my destiny.\"",
			"story": "iguessyouareaFremen,namedZdorab.AchildoftheharshArrakissandswithunyieldingsurvivalskills,Zdorabhasalifetimetoexplorethedeepdesert,uncoveringsecretsandprotectingtheirdunesfromoutsiders.TheFremen'slegendarypresenceandcourageemanatesfromZdorab,asheorshenavigateslifethroughtheever-shiftingchallengesofexistence.InZdorab'sjourney,awisdomgrows,guidingtheFremenpeopleintoabrighterfuture.Remember,Zdorab,thespiceislife,andlifeisprecious.",
			"tribe": "Fremen",
			"status": true,
			"image_job_id": "1b0cf737-d68f-41fa-8f59-cdcab3208bef"

		};

		return NextResponse.json(data)
	},
};

export {
	mockdata
}

const data = {
	// Backend API URL
	api_url: process.env.NEXT_PUBLIC_API_URL ?? process.env.NODE_ENV === "production" ? "https://backend.beta.sandsofarrakis.me/api" : "https://backend.beta.sandsofarrakis.me/api",
};

export {
	data
}
// Configuration for the Next.js project

// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables

const common = {
	// Domain 
	domain: process.env.NEXT_PUBLIC_BASE_URL ?? "https://beta.sandsofarrakis.me/",

	// API Url
	api_url: process.env.NEXT_PUBLIC_API_URL ?? "https://beta.sandsofarrakis.me/api",

	// URL for help and support requests
	helpSupport: 'https://support.vana.com/hc/en-us/requests/new',
	vanaWebsite: process.env.NEXT_PUBLIC_VANA_URL ?? "https://development-app.vana.com/sign-up-or-sign-in",
}

// Export the common configuration to use across the project
export { common };

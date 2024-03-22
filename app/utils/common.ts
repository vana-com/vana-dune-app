/**
 * Load environment variables for the application
 * reference: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
 */

const common = {
	// Base URL of the project
	domain: process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NODE_ENV === "production" ? "https://www.sandsofarrakis.me/" : "https://beta.sandsofarrakis.me/",
	// Backend API URL
	api_url: process.env.NEXT_PUBLIC_API_URL ?? process.env.NODE_ENV === "production" ? "https://backend.sandsofarrakis.me/api" : "https://backend.beta.sandsofarrakis.me/api",
	// Vana's Help and support URL
	helpSupport: process.env.NEXT_PUBLIC_VANA_HELP_URL ?? "https://support.vana.com/hc/en-us/requests/new",
	// Vana's homepage URL
	vanaWebsite: process.env.NEXT_PUBLIC_VANA_URL ?? process.env.NODE_ENV === "production" ? "https://app.vana.com/sign-up-or-sign-in" : "https://development-app.vana.com/sign-up-or-sign-in",
}

// Export common configuration
export { common };

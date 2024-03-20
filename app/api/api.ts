// Defines the API endpoint paths for various operations

export const api = {
    // Endpoint to generate authorization URL
    getAuthUrl: "/generateAuthorizeUrl",
    // Endpoint to generate OAuth token
    getOathToken: "/generateOauthToken",
    // Endpoint to retrieve user balance
    getBalance: "/users/balance",
    // Endpoint to generate a new prompt for the user
    getPrompt: "/users/generate-prompt",
    // Endpoint to retrieve saved prompt result for a user
    getSavedPrompt: "/user/get-save-result",
};

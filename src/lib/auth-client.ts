import { createAuthClient } from "better-auth/react";
import { apiKeyClient, magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
        apiKeyClient() 
    ]
})
'use client';

import {createAuthClient} from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
    plugins: [
        oneTapClient({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
            additionalOptions: {
            },
            promptOptions: {
                baseDelay: 1000,   // Base delay in ms (default: 1000)
                maxAttempts: 1     // Maximum number of attempts before triggering onPromptNotification (default: 5)
            }
        }),
    ]
});
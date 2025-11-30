import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/lib/db/client";
import * as schema from '@/lib/db/schema';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    user: {
        additionalFields: {
            thumio_id: {
                type: "string",
                defaultValue: null,
                input: true,
            }
        }
    },
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
            prompt: "select_account",
        }
    },
});

export type Session = typeof auth.$Infer.Session;
export type User = Session['user'];
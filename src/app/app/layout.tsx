import {ReactNode} from "react";
import {ThemeProvider} from "@/components/app/theme-provider";
import {getUser} from "@/features/auth/server/actions";
import {redirect} from "next/navigation";
import UserProvider from "@/features/auth/providers/user-provider";
import {QueryClientProvider} from "@/providers/query-client-provider";

export default async function AppLayout({children}: { children: ReactNode }) {
    const user = await getUser();

    if (!user) {
        redirect('/auth');
    }

    return (
        <QueryClientProvider>
            <UserProvider user={user}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
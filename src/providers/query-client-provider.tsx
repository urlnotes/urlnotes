'use client';

import {QueryClient, QueryClientProvider as BasicProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const client = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
    return (
        <BasicProvider client={client}>
            {children}
        </BasicProvider>
    );
}
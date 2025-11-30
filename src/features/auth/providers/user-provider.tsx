'use client';

import {createContext, ReactNode, useContext} from "react";
import {User} from "@/lib/auth";

const Context = createContext<User | null>(null);

export const useUser = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useUser must be used with context');
    }

    return context;
};

export default function UserProvider(
    {
        children,
        user,
    }: {
        children: ReactNode;
        user: User;
    }
) {
    return (
        <Context.Provider value={user}>
            {children}
        </Context.Provider>
    );
}
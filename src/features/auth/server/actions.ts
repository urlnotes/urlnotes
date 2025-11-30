'use server';

import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    return session.user;
}

export const getUserOrFail = async () => {
    const user = await getUser();

    if (!user) {
        throw new Error('Cannot find session user');
    }

    return user;
}
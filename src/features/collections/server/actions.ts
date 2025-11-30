'use server';

import {getUserOrFail} from "@/features/auth/server/actions";
import {db} from "@/lib/db/client";
import {eq, inArray} from "drizzle-orm";
import {collection} from "@/lib/db/schema";
import {id} from "zod/locales";

export const getUserCollections = async () => {
    const user = await getUserOrFail();

    return db
        .query
        .collection
        .findMany({
            where: eq(collection.userId, user.id)
        });
};

export const createCollection = async (
    {
        name,
        icon,
    }: {
        name: string;
        icon?: string | null;
    }
) => {
    const user = await getUserOrFail();

    return db
        .insert(collection)
        .values({
            userId: user.id,
            name,
            icon,
        })
        .returning();
}

export const getCollectionsByIds = async (
    {
        ids,
    }: {
        ids: string[];
    }
) => {
    return db
        .query
        .collection
        .findMany({
            where: inArray(collection.id, ids)
        });
}

export const getCollection = async (id: string) => {
    return db
        .query
        .collection
        .findFirst({
            where: eq(collection.id, id),
        });
}
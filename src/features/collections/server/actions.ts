'use server';

import {getUserOrFail} from "@/features/auth/server/actions";
import {db} from "@/lib/db/client";
import {and, eq, getTableColumns, inArray} from "drizzle-orm";
import {collection, link, linksToCollections} from "@/lib/db/schema";

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

export const getLinkCollections = async (linkId: string) => {
    const user = await getUserOrFail();

    return db
        .select({
            ... getTableColumns(collection)
        })
        .from(collection)
        .leftJoin(linksToCollections, eq(linksToCollections.collectionId, collection.id))
        .leftJoin(link, eq(linksToCollections.linkId, link.id))
        .where(
            and(
                eq(link.userId, user.id),
                eq(linksToCollections.linkId, linkId),
            ),
        );
};
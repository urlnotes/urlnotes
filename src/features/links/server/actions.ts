'use server';

import {getUserOrFail} from "@/features/auth/server/actions";
import {db} from "@/lib/db/client";
import {and, desc, eq, getTableColumns, ilike} from "drizzle-orm";
import {link, linksToCollections} from "@/lib/db/schema";
import {getHostFromUrl} from "@/features/links/utils/get-host";
import {getCollectionsByIds} from "@/features/collections/server/actions";

const {JSDOM} = await import('jsdom');

const linkColumns = getTableColumns(link);

export const getHosts = async ({collectionId}: { collectionId?: string } = {}) => {
    const user = await getUserOrFail();

    const query = db
        .selectDistinct({
            host: link.host,
        })
        .from(link);

    if (collectionId) {
        return query
            .innerJoin(linksToCollections, eq(linksToCollections.linkId, link.id))
            .where(
                and(
                    eq(link.userId, user.id),
                    eq(linksToCollections.collectionId, collectionId),
                )
            );
    }

    return query
        .where(
            eq(link.userId, user.id)
        );
};

export const getLinks = async (
    {host, search, collectionId}:
    { host?: string | null, search?: string, collectionId?: string }
) => {
    const user = await getUserOrFail();

    const sharedFilters = and(
        eq(link.userId, user.id),
        host ? eq(link.host, host) : undefined,
        !!search ? ilike(link.title, `%${search}%`) : undefined,
    );

    if (collectionId) {
        return db
            .select(linkColumns)
            .from(link)
            .innerJoin(linksToCollections, eq(linksToCollections.linkId, link.id))
            .where(
                and(
                    sharedFilters,
                    eq(linksToCollections.collectionId, collectionId),
                )
            )
            .orderBy(desc(link.createdAt));
    }

    return db
        .select(linkColumns)
        .from(link)
        .where(sharedFilters)
        .orderBy(desc(link.createdAt));
};

export const urlExists = async (url: string) => {
    const user = await getUserOrFail();

    const existed = await db
        .select({
            id: link.id,
        })
        .from(link)
        .where(
            and(
                eq(link.userId, user.id),
                eq(link.url, url),
            )
        );

    return existed.length > 0;
}

export const urlIsReachable = async (url: string) => {
    let abort: AbortController | null = new AbortController();

    try {
        setTimeout(() => {
            abort?.abort();
        }, 5000);

        const response = await fetch(url, {
            method: 'HEAD',
            signal: abort.signal,
        });

        abort = null;

        console.log('Request sent', url);

        return response.ok;
    } catch (error) {
        console.error('Response with error', url);
        console.error(error);
        return false;
    }
}

export const getLinkMeta = async (link: string) => {
    const user = await getUserOrFail();
    const response = await fetch(link);

    if (!response.ok) {
        return {
            success: false,
        };
    }

    const htmlText = await response.text();
    const {window: {document}} = new JSDOM(htmlText);

    let title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');

    if (!title) {
        title = document.querySelector('title')?.textContent;
    }

    let image =
        document.querySelector('meta[property="og:image"]')?.getAttribute('content')
        ?? document.querySelector('meta[property="twitter:image"]')?.getAttribute('content');

    if (!image && user.thumio_id) {
        await fetch(`https://image.thum.io/get/prefetch/auth/${user.thumio_id}/${link}`);
        image = `https://image.thum.io/get/auth/${user.thumio_id}/${link}`;
    }

    return {
        success: true,
        title,
        image: image || null,
    };
}

export const createLink = async (
    {
        url,
        title,
        imageUrl,
        collections,
    }: {
        url: string,
        title: string,
        imageUrl: string | null,
        collections: string[],
    }
) => {
    const user = await getUserOrFail();

    const created = (await db
        .insert(link)
        .values({
            userId: user.id,
            title,
            host: getHostFromUrl(url),
            url,
            imageUrl,
        })
        .returning())[0];

    const existedCollections = await getCollectionsByIds({ids: collections});
    const relationsToSave = existedCollections.map(collection => ({
        linkId: created.id,
        collectionId: collection.id,
    }));

    if (relationsToSave.length > 0) {
        await db
            .insert(linksToCollections)
            .values(relationsToSave);
    }

    return created;
}

export const deleteLink = async (id: string) => {
    return db
        .delete(link)
        .where(
            eq(link.id, id)
        )
        .returning();
}

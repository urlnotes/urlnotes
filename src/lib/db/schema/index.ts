import {foreignKey, index, pgTable, primaryKey, text, timestamp, uniqueIndex} from "drizzle-orm/pg-core";
import {uuid} from "drizzle-orm/pg-core/columns/uuid";
import {user} from "@/lib/db/schema/auth-schema";
import {relations} from "drizzle-orm";

export * from './auth-schema';

export const userRelations = relations(user, ({many}) => ({
    links: many(link),
    collections: many(collection),
}));

export const link = pgTable('link',
    {
        id: uuid().primaryKey().defaultRandom(),
        userId: text('user_id')
            .notNull()
            .references(() => user.id, {onDelete: 'cascade'}),
        host: text('host').notNull(),
        url: text().notNull(),
        title: text().notNull(),
        imageUrl: text('image_url'),
        note: text(),

        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
        }),
        index('user_id_idx').on(table.userId),
        uniqueIndex('user_id_url_unique_idx')
            .on(table.userId, table.url),
    ],
);

export const linkRelations = relations(
    link,
    ({one, many}) => ({
        user: one(user, {
            fields: [link.userId],
            references: [user.id],
        }),
        linksToCollections: many(linksToCollections),
    }),
);

export const collection = pgTable('collection', {
    id: uuid().primaryKey().defaultRandom(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, {onDelete: 'cascade'}),
    icon: text(),
    name: text().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const collectionRelations = relations(
    collection,
    ({one, many}) => ({
        user: one(user, {
            fields: [collection.userId],
            references: [user.id],
        }),
        linksToCollections: many(linksToCollections),
    }),
);

export const linksToCollections = pgTable(
    'link_collection',
    {
        linkId: uuid('link_id')
            .notNull()
            .references(() => link.id, {onDelete: 'cascade'}),
        collectionId: uuid('collection_id')
            .notNull()
            .references(() => collection.id, {onDelete: 'cascade'}),
    },
    t => [
        primaryKey({
            columns: [t.linkId, t.collectionId],
        }),
    ],
);

export const linksToCollectionsRelations = relations(
    linksToCollections,
    ({one}) => ({
        link: one(link, {
            fields: [linksToCollections.linkId],
            references: [link.id],
        }),
        collection: one(collection, {
            fields: [linksToCollections.collectionId],
            references: [collection.id],
        }),
    }),
);
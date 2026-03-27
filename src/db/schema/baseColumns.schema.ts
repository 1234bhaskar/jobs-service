import { timestamp, uuid } from "drizzle-orm/pg-core";

export const timestamps = () => ({
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const softDelete = () => ({
    deletedAt: timestamp("deleted_at")
});

export const uuidColumn = () => ({
    uuid: uuid("uuid").defaultRandom().notNull().unique(),
});
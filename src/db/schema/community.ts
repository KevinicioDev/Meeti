import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";//drizzle-orm es para definir la estructura de schemas las tablas

export const community = pgTable('communities',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name',{length: 255}).notNull(),
    description : text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),//Creada por
    createdBy: text('created_by').notNull(), //Persona que crea la comunidad
})



/*
type InsertCommunity2 = typeof community.$inferInsert
type SelectCommunity2 = typeof community.$inferSelect*/
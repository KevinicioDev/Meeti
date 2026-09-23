import { drizzle } from 'drizzle-orm/node-postgres'
// Importa drizzle, que sirve para crear la instancia de conexión
// entre nuestra aplicación y PostgreSQL.

import { relations } from './relations/index'
// Importa las relaciones definidas en:
// src/db/relations/index.ts

export const db = drizzle(process.env.DATABASE_URL!, {
    relations
})
// Crea y exporta la instancia "db" de Drizzle.
// DATABASE_URL contiene los datos de conexión a PostgreSQL.
// "!" indica a TypeScript que confiamos en que DATABASE_URL existe.
// "relations" le proporciona a Drizzle las relaciones entre nuestras tablas.
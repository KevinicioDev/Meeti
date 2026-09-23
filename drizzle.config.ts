import 'dotenv/config'
// Carga las variables del archivo .env para poder usar process.env

import { defineConfig } from 'drizzle-kit'
// Importa defineConfig, que sirve para crear la configuración de Drizzle

export default defineConfig({
    // Exporta la configuración para que Drizzle Kit pueda utilizarla
    out: './drizzle',
    // Carpeta donde Drizzle guardará las migraciones generadas
    schema: './src/db/schema/index.ts',
    // Ruta donde están los schemas que describen las tablas de la BD
    dialect: 'postgresql',
    // Indica que nuestra base de datos es PostgreSQL
    dbCredentials: {
        // Aquí colocamos los datos necesarios para conectarse a la BD
        url: process.env.DATABASE_URL!
        // Obtiene DATABASE_URL desde el archivo .env
        // ! indica a TypeScript que confiamos en que la variable existe
    }
})
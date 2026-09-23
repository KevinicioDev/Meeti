// Capa de Acceso a Datos: su única responsabilidad es comunicarse con la base de datos.

import { db } from "@/db";
import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/db/schema";

// 1. Contrato: Define qué operaciones existen (útil para tipado estricto y tests/mocks)
export interface ICommunityRepository {
    // Aquí defines las firmas de tus métodos, ej:
    //Metodo para crear las comunidades
    //Primero se pone que se espera, en este caso el InsertCommunity que contiene todo esto
    create(data : InsertCommunity) : Promise<SelectCommunity>
}

// 2. Implementación: Ejecuta las consultas reales hacia la DB (Prisma, TypeORM, etc.)
class CommunityRepository implements ICommunityRepository {
    // Aquí implementas la lógica de las consultas a la base de datos
    async create(data : InsertCommunity){
        //array destructuring para tener un objeto []
        const [result] = await db.insert(community).values(data).returning()
        return result
    }
}

// 3. Instancia única (Singleton): Exporta el repositorio listo para usarse sin duplicar conexiones
export const communityRepository = new CommunityRepository();
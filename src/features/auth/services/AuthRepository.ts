import { db } from "@/src/db";
import { User } from "../types/auth.types";

// Interfaz que funciona como un contrato para AuthRepository.
// Indica qué métodos debe tener cualquier clase que implemente esta interfaz.
export interface IAuthRepository {

    // Recibe el email como string.
    // Promise indica que la función es asíncrona y devolverá el resultado
    // en el futuro.
    //
    // User | undefined significa que puede devolver:
    // - Un User si encuentra al usuario.
    // - undefined si no encuentra ningún usuario.
    userExists(email: string): Promise<User | undefined>
}

// Encargado de interactuar con la base de datos
// (Los repositorios serán los únicos medios de comunicación con la db).
//
// implements para atar IAuthRepository a AuthRepository.
// Esto obliga a AuthRepository a cumplir con los métodos
// definidos dentro de IAuthRepository.
class AuthRepository implements IAuthRepository {

    // Función encargada de buscar un usuario por su email.
    async userExists(email: string) {

        // Con query solo aparecen schemas que tengan una relación.
        //
        // db.query permite realizar consultas utilizando la API relacional
        // de Drizzle.
        //
        // users corresponde al schema/tabla "users".
        //
        // findFirst busca el primer registro que cumpla con la condición.
        return await db.query.users.findFirst({

            // where indica la condición que debe cumplir el registro.
            where: {

                // Es un objeto, pudiera ser email: email,
                // pero con uno colocado está perfecto.
                //
                // Como la propiedad y la variable tienen el mismo nombre,
                // JavaScript/TypeScript permite escribir simplemente "email".
                email
            }
        })
    }
}

// Instanciarlo, instanciar = crear un objeto a partir de una clase.
//
// new AuthRepository() crea una nueva instancia de la clase AuthRepository.
// Después exportamos esa instancia para poder utilizarla desde otros archivos,
// por ejemplo, desde AuthService.
export const authRepository = new AuthRepository();
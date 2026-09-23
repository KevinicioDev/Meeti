import { headers } from "next/headers";
import { auth } from "./auth";

//Esta funcion obtiene la session de better auth
//Esta función simplemente encapsula todo lo anterior
export async function getServerSession() {
    //getSession trae la sesion del usuario
    //Aquí Better Auth básicamente pregunta: "Con la información de esta petición, ¿hay una sesión válida?"
    const session = await auth.api.getSession({//instancia auth tiene la info de si el usuario esta authenticado o no
//headers() obtiene los headers de la petición actual.
// Ahí viaja información de la petición, incluyendo las cookies que permiten que Better Auth identifique la sesión del usuario.
//Por eso se le pasan a: auth.api.getSession()
        headers: await headers()//Permitira verificar si un user esta authenticado
    })
    return session
}

//helper para requerir la authenticacion
// Esta función utiliza la anterior:
// const session = await getServerSession()
// Después comprueba:
// isAuth: session ? true : false
export async function requireAuth() {
    const session = await getServerSession()//session va tener la session o va ser null
    return{
        session,
        isAuth : session ? true : false//Check sencillo, tenemos algo en session? Si si : true si no : false
    }
}
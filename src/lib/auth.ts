// Configuración de Better Auth
import { betterAuth } from 'better-auth' // Función principal para configurar Better Auth

import { drizzleAdapter } from 'better-auth/adapters/drizzle' // Conecta Better Auth con Drizzle

import { nextCookies } from 'better-auth/next-js' // Integra las cookies de autenticación con Next.js

import { db } from '../db/index' // Conexión a la base de datos
import * as schema from '../db/schema' // Importa los schemas de las tablas
import { AuthEmailService } from '../emails/services/AuthEmailService'

export const auth = betterAuth({ // Crea y exporta la configuración de autenticación

    database: drizzleAdapter(db, { // Configura Drizzle como adaptador de base de datos
        provider: 'pg', // Indica que usamos PostgreSQL
        schema, // Proporciona los schemas de la base de datos
        usePlural: true // Usa los nombres de tablas en plural
    }),

    emailAndPassword: {
        enabled: true, // Habilita el registro e inicio de sesión con email y contraseña
        requireEmailVerification: true,//habilitar que se requiere la autenticacion
        sendResetPassword: async ({user, url}) =>{//es asincrono por que va interactuar con mailtrap y hacemos callback
            const { name, email} = user
            await AuthEmailService.sendPasswordResetToken({name, email, url})
        }
    }, 
    emailVerification: {//Propiedad para poder enviar el correro
        sendOnSignIn: true,//Para si quiere iniciar sesion y no a confirmado se le mande el correo
        autoSignInAfterVerification: true, //Inicia la sesion de usuario en cuanto se verifica
        //En lugar de poner data dentro de  "()" aplicamos destructuring y en automatico accedemos a los valores que da el data
        sendVerificationEmail: async ({ user, url }) => {//Para el email que queremos enviar
            //En lugar de usar la forma basica pasamos esto a una constante
            const {name,email} = user
            await AuthEmailService.sendVerificationEmail({name,email,url})
            // name: user.name,
            // email: user.email,
            // url
        }

    },

    plugins: [nextCookies()] // Habilita el manejo de cookies en Next.js
})
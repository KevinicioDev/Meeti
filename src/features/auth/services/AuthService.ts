import { auth } from "@/src/lib/auth";
import { ForgotPasswordInput, SetPasswordInput, SignInInput, SignUpInput } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { headers } from "next/headers";
import { APIError } from "better-auth";


// Service es el que se comunica con el repositorio, es el que lo coordina
class AuthService { // Se procesa en el service

    // Constructor de la clase.
    // Recibe el repositorio que vamos a utilizar dentro del Service.
    constructor(
        // "private" crea automáticamente una propiedad llamada authRepository
        // y guarda ahí el objeto que recibimos como parámetro.
        // IAuthRepository indica que debe cumplir con el contrato de esa interfaz.
        private authRepository: IAuthRepository
    ) { }

    async register(credentials: SignUpInput) { // A credentials le llegan los datos de data

        // Desestructuramos credentials para obtener solamente los datos
        // que necesitamos para registrar al usuario.
        const { name, email, password } = credentials;

        // Revisar si el usuario existe.
        // "this" hace referencia a la instancia actual de AuthService.
        // Por eso usamos this.authRepository para acceder al repositorio
        // que recibimos en el constructor.
        const user = await this.authRepository.userExists(email);


        // Si el usuario ya existe, detenemos el registro.
        // Esta es una validación de negocio, por eso se realiza en el Service.
        if (user) {
            return {
                error: 'Este e-mail ya esta registrado',
                success: ''
            };
        }

        // Manejar el registro.
        // "auth" contiene la configuración de Better Auth.
        // signUpEmail se encarga de registrar al usuario mediante Better Auth.
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: '/dashboard'
            },
            headers: await headers() // Obtiene los headers necesarios para manejar la sesión/cookie.
        });

        // Devolvemos una respuesta indicando que el registro fue exitoso.
        return {
            error: '',
            success: 'Cuenta Creada Correctamente! Revisa Tu e-mail'
        };
    }

    async login(credentials: SignInInput) {
        const { email, password } = credentials
        // Revisar si el usuario existe.
        // "this" hace referencia a la instancia actual de AuthService.
        // Por eso usamos this.authRepository para acceder al repositorio
        // que recibimos en el constructor.
        const user = await this.authRepository.userExists(email);

        // Si el usuario ya existe, detenemos el registro.
        // Esta es una validación de negocio, por eso se realiza en el Service.
        if (!user) {
            return {
                error: 'El usuario no existe!',
                success: ''
            }
        }
        //Verificar su password y si confirmo su cuenta
        // Intenta iniciar sesión con Better Auth.
        // Se usa try/catch porque signInEmail puede lanzar un error
        // cuando la autenticación falla, permitiendo manejarlo sin romper la aplicación.
        try {
            // Intenta iniciar sesión con Better Auth.
            // Si ocurre un error, pasa directamente al catch.
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: '/dashboard' // Página a la que irá después de iniciar sesión.
                },
                headers: await headers() // Obtiene los headers necesarios para manejar la sesión/cookie.
            })

            // Si el inicio de sesión fue exitoso, devuelve un mensaje de éxito.
            return {
                error: '',
                success: 'Sesión Iniciada Correctamente!'
            }

        } catch (error) {
            // Si Better Auth lanza un error, lo recibimos aquí.
            if (error instanceof APIError) {

                // Relaciona cada código de error con el mensaje que queremos mostrar.
                const messages: Record<number, string> = {// Define un objeto donde el código de error es un número y su mensaje es texto.
                    401: 'Password Incorrecto!',
                    403: 'Tu cuenta no ha sido verificada, hemos enviado un email',
                }

                // Busca el mensaje usando el código de error que devolvió Better Auth.
                const errorMessage = messages[error.statusCode]

                // Si encontramos un mensaje para ese código, lo devolvemos.
                if (errorMessage) {
                    return {
                        error: errorMessage,
                        success: ''
                    }
                }
            }
        }
        //Si llegamos hasta aquí y ningún caso anterior devolvió una respuesta, devuelve igualmente un objeto con error y success.
        return {
            error: '',
            success: ''
        }
    }
    // 5) Se llega al Service para ejecutar las reglas de negocio
    async requestPasswordReset(input: ForgotPasswordInput) {
        //Verificar que el usuario exista
        // Consulta en base de datos mediante el Repository
        const user = await this.authRepository.userExists(input.email)
        //En caso de que el usuario no exista 
        //6) Lo regresa al action
        if (!user) {
            return {
                error: 'El usuario no existe!',
                success: ''
            }
        }
        //Metodo de better Auth para resetear la contrasenia
        const { email } = input //Este input es el de arriba, el de 'requestPasswordReset'
        //Esto va procesar el envio del email
        await auth.api.requestPasswordReset({
            body: {//toma un parametro
                email
            }
        })
        // Si existe, retorna el mensaje de éxito al Action
        return {
            error: '',
            success: 'Hemos enviado un email con instrucciones!'//Lo puse el mensaje para testear
        }
    }

    async confirmPasswordReset(input: SetPasswordInput, token: string) {
        //Se usa try catch por que requerimos leer el posible error
        //Error de que si el toen expira pero el usuario visito la url ya no hay validacion
        const { newPassword } = input
        try {
            await auth.api.resetPassword({
                body: {
                    newPassword,
                    token
                },headers : await headers()
            })
            return {
                error: '',
                success: 'Password reestablecido correctamente!'
            }
        } catch (error) {
            if (error instanceof APIError) {
                return {
                    error: 'Token no valido o Expirado!',
                    success: ''
                }
            }
        }
        //TypeScript y Next.js espera un return, aunque este vacio
        //Para que el response tenga error y success
        return {
            error: '',
            success: ''
        }
    }
}

// Creamos una instancia de AuthService.
// Le pasamos authRepository al constructor.
// Esto se conoce como inyección de dependencias:
// AuthService recibe desde afuera el repositorio que necesita utilizar.
export const authService = new AuthService(authRepository);
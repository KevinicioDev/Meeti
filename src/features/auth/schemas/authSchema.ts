import { z } from 'zod'

//Base para una contrasenia fuerte
//z para construir un validador y guardarlo en StrongPassword.
//z es una caja de herramientas llena de funciones (z.string(), z.number(), z.object(), etc.).
/**Al escribir const StrongPassword = z.string()...:
Llamas a z.string() para que Zod fabrique un validador de texto.
Le encadenas las reglas (.min(), .regex()).
El resultado final (un esquema listo para validar contraseñas) se almacena dentro de la constante StrongPassword. */
const StrongPassword = z
    .string()
    .trim()
    .min(8, { error: 'El password debe ser minimo de 8 caracteres' })
    .regex(/[0-9]/,{error: 'El password debe incluir al menos un numero'})//Es un lenguaje de búsqueda de patrones dentro de textos.
    .regex(/[^a-zA-Z0-9]/,{error:'El password debe contener al menos un caracter especial'})

//Base, este tambien se usa para recuperar contrasena
export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: 'El nombre es obligatorio!' }),//El nombre debe ser una string, minimo 1 para que no este vacio, {error por si ingresa algo vacio}
    email: z.email({ error: 'EL email no es valido' }),//Con zod con el .email ya no ocupas poner el formato del email
    password: StrongPassword,
    passwordConfirmation: z.string().trim().min(1, { error: 'El password de confirmacion no puede ir vacio' }),//No se pone el nombre del id si no el del name
    newPassword: StrongPassword
})
//trim() es para eliminar espacios que quedan, solo aplica en strings

//Al contrario de pick "omit" omite los que le pases
export const SignInSchema = BaseAuthSchema.pick({
    email: true
}).extend({
    password: z.string().trim().min(1, { error: 'El password no puede ir vacio' }),
})

export const SignUpSchema = BaseAuthSchema.pick({//pick de este schema, quiero quedarme solamente con estos campos
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
}).refine(//refine en Zod sirve para hacer validaciones personalizadas
    // Comprueba que ambos passwords sean iguales.
    (data) => data.password === data.passwordConfirmation,
    {
        error: 'Los Passwords no son iguales',
        // Muestra el error en el campo de confirmación.
        path: ['passwordConfirmation']
    }
)

//Es para recuperacion de cuenta
export const ForgotPasswordSchema = BaseAuthSchema.pick({
    email: true
})

export const SetPasswordSchema = BaseAuthSchema.pick({
    newPassword: true,
    passwordConfirmation: true
}).refine(//refine en Zod sirve para hacer validaciones personalizadas
    // Comprueba que ambos passwords sean iguales.
    (data) => data.newPassword === data.passwordConfirmation,
    {
        error: 'Los Passwords no son iguales',
        // Muestra el error en el campo de confirmación.
        path: ['passwordConfirmation']//Path es para decir donde quiero que se muestre el mensaje de error
    }
)



//Para tipar
//Tipar significa decirle a TypeScript qué tipo de dato esperamos que tenga algo
//Crea automáticamente un tipo de TypeScript basándote en mi schema de Zod
export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type SetPasswordInput = z.infer<typeof SetPasswordSchema>
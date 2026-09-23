"use server"
import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SignInInput, SignInSchema, SignUpInput, SignUpSchema } from "../schemas/authSchema"
import { authService } from "../services/AuthService"

//Sera procesado en el servidor
//async significa que esa función puede realizar operaciones asíncronas y que devuelve una Promise
//input debe tener la estructura definida por SignUpInput.
export async function signUpAction(input: SignUpInput) {
    //parse es cuando se esta seguro que vamos a tener exactamente los datos solicitados por ejem. consumir una api, ya se sabe que los datos son iguales
    //safeParse si se cree que algo puede fallar
    //.success arrojara un true o false dependiendo los datos enviados
    const data = SignUpSchema.safeParse(input)
    if (!data.success) {//En caso de que de false
        return {
            error: 'Hubo un error',
            success: ' '//Lo dejamos vacio por que representa pues que como tal no da nada por el error
        }
    }
    //se regresa la respuesta del server al action y de aqui al register form
    const response = await authService.register(data.data)//Esa constante de data tiene las credenciales, con el .data accedemos a todo eso
    return response
}
export async function signInAction(input: SignInInput) {
    const data = SignInSchema.safeParse(input)
    //validar para que no de undefined
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }
    const response = await authService.login(data.data)//Tiene el email y el password
    //Toma la respuesta que me dio el Service y devuélvesela a quien llamó a este Action.
    return response
}
export async function ForgotPasswordAction(input: ForgotPasswordInput) {
    // 3) Validación en el servidor con Zod (seguridad backend)
    //safeParse: devuelve un objeto con un estado controlable
    //Control de flujo limpio: Permite manejar el error con un simple if (!data.success) antes de interactuar con la base de datos.
    const data = ForgotPasswordSchema.safeParse(input)
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }

    // 4) Validación exitosa: se delega la lógica de negocio al Service
    // 7) Llega a este response desde el Service y lo retorna al cliente
    /*
    data.data: Pasa únicamente los datos limpios, tipados y parseados por Zod,
    descartando cualquier propiedad basura o inyección extra que el cliente haya enviado.
    return response: Devuelve al cliente el resultado final { error, success }
    emitido por el servicio para que la UI pueda reaccionar (por ejemplo, con el toast).
    */
    const response = await authService.requestPasswordReset(data.data)
    return response
}

export async function setPasswordAction(input:SetPasswordInput, token: string) {
    //Validamos en el servidor
    const data = SetPasswordSchema.safeParse(input)
    if(!data.success){
        return {
            error : 'Hubo un error!',
            success : ''
        }
    }
    const response = await authService.confirmPasswordReset(data.data, token)
    return response
}
"use client"
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/shared/components/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SetPasswordInput, SetPasswordSchema } from "../schemas/authSchema"
import { redirect, useSearchParams } from "next/navigation"
import { setPasswordAction } from "../actions/auth-actions"
import toast from "react-hot-toast"

//Lo hacemos de cliente
export default function SetPasswordForm() {

    //hook para el token
    const SearchParams = useSearchParams()
    const token = SearchParams.get('token')//Este get permite obtener el valor, en este caso token
    if(!token) redirect('/auth/forgot-password')//Si no hay token redirigimos a forgot password

    
    const { register, handleSubmit, formState: { errors } } = useForm({//Usamos React-hook-form
        /*resolver: Es una configuración de useForm que le indica a 
        React Hook Form quién se va a encargar de validar el formulario. */
        resolver: zodResolver(SetPasswordSchema),
        /*zodResolver: Es un adaptador o "puente". React Hook Form no sabe leer esquemas de Zod por defecto.
        zodResolver conecta ambas librerías, permitiendo que React Hook Form delegue toda la validación a tu esquema
        SetPasswordSchema */
        mode: 'all'
    })

    const onSubmit = async(data : SetPasswordInput) => {
        const {error, success} = await setPasswordAction(data, token)
        if(error) toast.error(error)
        if(success){
            toast.success(success)
            redirect('/auth/login')
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="newPassword">Nuevo Password</FormLabel>
            <FormInput
                type="password"
                id="newPassword"
                placeholder="Ingresa tu nuevo password"
                /**La función register('newPassword') toma el nombre de tu campo
                y devuelve un objeto con 4 propiedades clave necesarias para manejar inputs en React: onChange, onBlur, name y ref */
                {...register('newPassword')}//Lo atamos
                /*El operador de propagación o spread operator (...)
                "desempaqueta" esas propiedades dentro del componente <FormInput>. */
            />
            {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}
            {/**Si el input es inválido: Zod detecta el error y React Hook Form llena el 
            objeto errors.newPassword con información (verdadero). Como el lado izquierdo ahora es verdadero, 
            React procede a renderizar el lado derecho de la expresión: tu componente <FormError>. */}
            <FormLabel htmlFor="passwordConfirmation">Repetir Password</FormLabel>
            <FormInput
                type="password"
                id="passwordConfirmation"//Este ya tenemos un schema de zod
                placeholder="Repite tu password"
                {...register('passwordConfirmation')}//Lo atamos
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            <FormSubmit
                value='Reestablecer Password'//Su valor es restablecer el password
            />
        </Form>
    )
}

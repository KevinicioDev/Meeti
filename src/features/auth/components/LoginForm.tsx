"use client"
//Aplicar llaves en Form por que es un export nombrado
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {Form, FormError, FormInput, FormLabel, FormSubmit} from "@/src/shared/components/forms"
import { SignInInput, SignInSchema } from '../schemas/authSchema'
import { signInAction } from '../actions/auth-actions'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

//Es para renderizar y se utilice en el cliente
export default function LoginForm() {
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver : zodResolver(SignInSchema),
        mode : 'all'
    })

    const onSubmit = async (data: SignInInput) =>{
        const {success, error} = await signInAction(data)
        if(error){
            toast.error(error)
        }
        if(success){
            toast.success(success)
            //Si es correcta la authenticacion colocamos u redirect
            redirect('/dashboard')
        }
    }

    return (
        <Form
        // handleSubmit: ejecuta la función onSubmit
        // cuando el formulario se envía correctament
        onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="email" >E-mail</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                //tres puntitos ... se llaman spread syntax (operador de propagación),
                //y en este caso sirven para pasarle a tu <FormInput> todas las propiedades que React Hook Form necesita para controlar ese input.
                {...register('email')}
            />
            {/*revisar si existe un error y, si existe, mostrarlo.*/}
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Ingresa tu contrasena"
                {...register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormSubmit value="Iniciar Sesion"/>
        </Form>
    )
}

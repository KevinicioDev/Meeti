"use client" // Este componente se ejecuta del lado del cliente.

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { SignUpInput, SignUpSchema } from '../schemas/authSchema'
import { signUpAction } from '../actions/auth-actions'

export default function RegisterForm() {

    // useForm: crea y administra el formulario con React Hook Form.
    // register: conecta cada input con React Hook Form
    // para poder registrar y recuperar su valor.
    // handleSubmit: controla el envío del formulario
    // y pasa los datos a la función que indiquemos.
    // errors: contiene los errores de validación de los campos.
    //resolver: es básicamente el puente entre React Hook Form y Zod, hace que hook utilice el esquema de zod pa validar
    //reset: esto resetea el formulario
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: 'all'//Para colocar un modo de validacion
    })
    //data debe tener la estructura que definí en SignUpSchema
    //Por si por ejemplo me mandan un tipom de dato 'edad' diga que no existe
    const onSubmit = async(data : SignUpInput) => {
        //Lo pasamos desde el cliente hacia el servidor con el action
        //Aqui llega la respuesta del Server service que mando al action y del action aqui
        const {error, success} = await signUpAction(data)//await Espera a que signUpAction termine antes de continuar con lo que sigue.
        if(error){
            toast.error(error)
        }
        if(success){
            toast.success(success)
            reset()
        }
    }
    return (
        <Form
            // handleSubmit: ejecuta la función onSubmit
            // cuando el formulario se envía correctament
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Ingresa tu nombre"
                // register: conecta este input con React Hook Form
                // y registra el campo con el nombre "name"                
                {...register('name')}
            />
            {/* Muestra el mensaje de error del campo "name" si existe. */}
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                // Registra este input con el nombre "email".
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <FormInput
                id="password"
                type="password"
                placeholder="Password - Min. 8 Caracteres"
                // Registra este input con el nombre "password".
                {...register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormLabel htmlFor="password_confirmation">
                Repetir Contraseña
            </FormLabel>
            <FormInput
                id="password_confirmation"
                type="password"
                placeholder="Repite tu Password"
                // Registra este input con el nombre "passwordConfirmation".
                {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            <FormSubmit
                value="Registrarme"
            />
        </Form>
    )
}
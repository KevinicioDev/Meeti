// Directiva de Next.js (App Router) que indica que este componente debe ejecutarse 
// en el navegador del cliente para permitir interactividad y el uso de hooks.
"use client"

// Importa el hook principal para manejar formularios de forma eficiente en React.
import { useForm } from 'react-hook-form'

// Importa componentes visuales reutilizables personalizados para estructurar el formulario.
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"

// Adaptador oficial para conectar esquemas de validación Zod con react-hook-form.
import { zodResolver } from '@hookform/resolvers/zod'

// Esquema de validación que define las reglas requeridas para este formulario (ej. tipo de dato, formato de email).
import { ForgotPasswordInput, ForgotPasswordSchema } from '../schemas/authSchema'
import { ForgotPasswordAction } from '../actions/auth-actions'
import toast from 'react-hot-toast'

// Componente principal de la vista de recuperación de contraseña.
export default function ForgotPasswordForm() {

    // Inicialización del hook useForm con desestructuración de utilidades clave:
    // - register: función para enlazar inputs al estado del formulario.
    // - handleSubmit: función envoltorio para procesar el envío de datos válidos.
    // - formState.errors: objeto que contiene los mensajes de error detectados por la validación.
    const { register, handleSubmit, formState: { errors } } = useForm({
        // Conecta el validador de Zod para evaluar las entradas del usuario.
        resolver: zodResolver(ForgotPasswordSchema),
        // Ejecuta la validación en múltiples eventos: al teclear (onChange) y al perder foco (onBlur).
        mode: 'all'
    })

    // 1) Función que recibe los datos ya validados por react-hook-form en el cliente
    const onSubmit = async (data: ForgotPasswordInput) => {
        // 2) Ejecutamos el Server Action enviando la data
        const { error, success } = await ForgotPasswordAction(data)

        // 8) Manejamos la respuesta final en la UI mostrando notificaciones
        if (error) {
            toast.error(error)
        }
        if (success) {
            toast.success(success)
        }
    }

    return (
        // Contenedor principal estilizado para el formulario.
        // handleSubmit ejecuta la validación del cliente antes de llamar a onSubmit
        /*
        handleSubmit es un guardia interceptor: No puedes pasarle onSubmit directamente al formulario 
        (onSubmit={onSubmit}) porque la función se ejecutaría sin validar primero.
        */
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Etiqueta accesible vinculada al input mediante el atributo 'htmlFor' */}
            <FormLabel htmlFor="email">E-mail</FormLabel>

            {/* Campo de texto para correo. 
                {...register('email')} inyecta name, onChange, onBlur y ref automáticamente */}
            <FormInput
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                {...register('email')}
            />

            {/* Renderizado condicional: si Zod detecta un fallo en el campo 'email', muestra el mensaje de error */}
            {errors.email && <FormError>{errors.email.message}</FormError>}

            {/* Botón de envío del formulario */}
            <FormSubmit value={"Enviar Instrucciones"} />

        </Form>
    )
}
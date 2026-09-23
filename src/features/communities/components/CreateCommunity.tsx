"use client"
import { Form, FormSubmit } from "@/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { createCommunityAction } from "../actions/community-actions";

export default function CreateCommunity() {
    //Se crea una variable llamada methods a partir de useForm
    const methods = useForm({//Methods va contener todo lo que da el useForm
        resolver: zodResolver(CommunitySchema),
        mode: 'all',
        //Para que su valor inical sea un string vacio
        defaultValues: {
            name : '',
            description : ''
        }
    })
    const onSubmit = async (data : CommunityInput) =>{
        await createCommunityAction(data)//Le pasamos el data obtenido al action
    }

    return (
        //Todos los hijos de forma proovider tienen esa instancia
        /**Los tres puntos (...) son el operador de propagación (spread operator) de JavaScript.
        El componente <FormProvider> necesita recibir todas las funciones de methods como propiedades individuales.
        Sin el spread, tendrías que escribir esto a mano
        Con {...methods}, JavaScript desempaca automáticamente cada clave y valor de ese objeto y
        se los pasa como props directas al componente */
        <FormProvider {...methods}>
            <Form
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommunityForm />
                <FormSubmit value={'Crear Comunidad'} />
            </Form>
        </FormProvider>
    )
}
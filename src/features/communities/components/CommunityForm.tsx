//Este tambien es componente de cliente pero como se varenderizar con Create community no se necesita poner aqui
import { FormError, FormInput, FormLabel, FormTextArea } from "@/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";

export default function CommunityForm() {

    const {register, formState : {errors}} = useFormContext<CommunityInput>()//Via <> le podemos decir que tipo de dato va estar en esos register y errores
    return (
        <>
            <FormLabel htmlFor="name">Nombre Comunidad</FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Titulo Comunidad"
                {...register('name')}
            />{/*revisar si existe un error y, si existe, mostrarlo.*/}
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel
                htmlFor="description">Descripción Comunidad</FormLabel>
            <FormTextArea
                id="description"
                placeholder="Descripción Comunidad"
                {...register('description')}
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
        </>
    )
}
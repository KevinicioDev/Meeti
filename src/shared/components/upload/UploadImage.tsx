import { CommunityInput } from "@/features/communities/schemas/communitySchema"
import { UploadDropZone } from "@/shared/utils/uploadthing"
import Image from "next/image"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { FormError } from "../forms"

export default function UploadImage() {
    //setValue permite setear un valor en los campos de formulario de forma manual
    const { formState: {errors}, setValue, clearErrors} = useFormContext<CommunityInput>()
    const [uploadedImage, setUploadedImage] = useState('')
    return (
        <>
            <UploadDropZone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
                onClientUploadComplete={(res) => {//Esta funcion se manda a llamar cuando los uploads han sido completados
                    setUploadedImage(res[0].ufsUrl)
                    setValue('image', res[0].ufsUrl)
                    clearErrors('image')
                }}
                appearance={{
                    button: "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after: top-0",
                    label: "text-sm text-gray-600 hover:text-gray-600",
                    allowedContent: "text-sm"
                }}
                content={{
                    button: "Selecciona una Imagen",
                    label: "Elige un Archivo o arrastralo aqui",
                    allowedContent: "Maximo una imagen de 1MB"
                }}
                config={{
                    cn: twMerge,
                    mode: 'auto'//Sube en automatico la imagen al momento de cargarla en el dropzone
                }}
            />

            {errors.image && <FormError>{errors.image.message}</FormError>}
            {uploadedImage && (//Si hay algo entonces retornamos lo siguiente
                <>
                    <p className="text-lg font-bold">Imagen Nueva:</p>

                    <Image
                        src={uploadedImage}//Se pone uploadImage por que en este punto debemos tener algo ahi
                        alt="Imagen Publicada"
                        width={300}
                        height={200}
                    />
                </>
            )}

        </>
    )
}

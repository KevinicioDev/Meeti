import z from "zod";

export const CommunitySchema = z.object({
    name: z.string()
        .min(3, { error: 'El Titulo de la Comunidad es Obligatorio' }),
    description: z.string()
        .min(10, { error: 'La Descripción es obligatoria' }),
    image: z.url({
        protocol: /^https?$/,//Valida que siempre inicien con https
        hostname: z.regexes.domain,//Aqui estaran todas las expresiones regulares para los dominios
        error: 'La imagen es obligatoria'
    })
})

export type CommunityInput = z.infer<typeof CommunitySchema>
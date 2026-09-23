"use server"
import { requireAuth } from "@/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";

//Todas las acciones relacionadas con las comunidades
export async function createCommunityAction(input: CommunityInput) {//input tiene lo del data de CreateCommunity.tsx
    //Validacion desde el server
    const data = CommunitySchema.safeParse(input)
    //En caso de no pasar a validacion
    if (!data.success) {
        return {
            error: 'Hubo un error!',
            success: ''
        }
    }

    //En caso de que el usuario no este autenticado
    //El requireAuth es un helper para requerir la authenticacion
    const { session } = await requireAuth()//Para si el usuario de la session esta autenticado puede hacer cambios en el community action
    if (!session) {
        return {
            error: 'Hubo un error!',
            success: ''
        }
    }

    //data.data para data y session.user.id para userId
    await communityService.createCommunity(data.data, session.user.id)
}
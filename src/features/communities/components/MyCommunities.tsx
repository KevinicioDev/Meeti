import { requireAuth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import { communityService } from "../services/CommunityService"
import Link from "next/link"
import { community } from "@/db/schema"
import CommunityItem from "./CommunityItem"

export default async function MyCommunities() {
    const { session} = await requireAuth()
    if(!session) redirect('/auth/login')

    const communities = await communityService.getUserCommunities(session.user)
    return (
        //Para detectar si ese arreglo tiene algo
        communities.length ? (

            //En caso de que si exista
            <ul role="list" className="mt-10 shadow-lg p-10 divide-y divide-gray-100">
                {communities.map(community =>(//Accedemos a cada comunidad
                // El 'key' debe ser un ID único de la base de datos (nunca el índice 0,1,2).
                // React lo usa para saber exactamente qué elemento se borra, edita o mueve, 
                // sin tener que redibujar toda la lista entera, mejorando el rendimiento.
                    <CommunityItem key={community.data.id} community={community}/>//Como se esta iterando se debe de poner el key
                ))}

            </ul>
            //En caso de que no tenga nada
        ) : <p className="text-center mt-10 text-lg">No hay comunidades aun {''}
            <Link
                href={'/dashboard/communities/create'}
                className="text-orange-500 font-bold hover:text-orange-700"
            >Comienza creando una!</Link>

        </p>
    )
}

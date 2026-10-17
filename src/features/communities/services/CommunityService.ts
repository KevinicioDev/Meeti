//Service es el puente entre el action y el repository y se encarga de orquestar los llamados hacia la DB y la comunicacion con los actions
import { User } from "better-auth";
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";

// Capa de Negocio: Aplica reglas de negocio, valida condiciones y orquesta los datos.
class CommunityService {
    // Inyección de dependencias: Exige una interfaz (ICommunityRepository), no una clase fija.
    // Esto desacopla el servicio y permite reemplazar la DB por datos falsos al hacer pruebas unitarias.
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    // Aquí agregas los métodos con lógica de negocio que llamarán los Actions/Controladores
    async createCommunity(data: CommunityInput, userId: string) {
        const community = await this.communityRepository.create({
            ...data,//... aplanamos el objeto sacando sus valores y se asignan dentro de el objeto de create
            createdBy: userId
        })
        return community
    }

    async getUserCommunities(user: User) {
        //findByUser(user.id) busca en la base de datos todas las comunidades a las que el usuario pertenece.
        const communities = await this.communityRepository.findByUser(user.id)
        // Promise.all toma todas las tareas pendientes del .map y las ejecuta AL MISMO TIEMPO.
        // Esto evita cuellos de botella y hace que la consulta sea mucho más rápida.
        //Por ejemplo se usa cuando quiero traer 10 fotos de perfil de usuario y no hacerlos esperar hasta que termine el proceso de uno
        const enriched = await Promise.all(communities.map(async (community) => {


            //isMember como true (asume que si la base de datos las devolvió,
            //es porque ya es miembro) y ejecuta el policy (CommunityPolicy.isAdmin) para calcular el rol en tiempo real
            const isMember = true
            const isAdmin = CommunityPolicy.isAdmin(user, community)


            /**
             * En lugar de devolver solo los datos crudos de la comunidad,
             * devuelve un objeto que separa la información pura (data) de los permisos del usuario actual (context)
             */
            return {
                data: community,
                context: {
                    isMember,
                    isAdmin
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)

                }
            }
        }))
        return enriched
    }
}
// Instancia única (Singleton): Inyecta el repositorio real al servicio y lo exporta para los Actions
export const communityService = new CommunityService(communityRepository);
//Service es el puente entre el action y el repository y se encarga de orquestar los llamados hacia la DB y la comunicacion con los actions
import { CommunityInput } from "../schemas/communitySchema";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";

// Capa de Negocio: Aplica reglas de negocio, valida condiciones y orquesta los datos.
class CommunityService {
    // Inyección de dependencias: Exige una interfaz (ICommunityRepository), no una clase fija.
    // Esto desacopla el servicio y permite reemplazar la DB por datos falsos al hacer pruebas unitarias.
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    // Aquí agregas los métodos con lógica de negocio que llamarán los Actions/Controladores
    async createCommunity(data : CommunityInput, userId : string){

    }
}

// Instancia única (Singleton): Inyecta el repositorio real al servicio y lo exporta para los Actions
export const communityService = new CommunityService(communityRepository);
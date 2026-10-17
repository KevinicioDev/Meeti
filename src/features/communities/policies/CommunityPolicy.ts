//Este archivo es el "cerebro" de las validaciones. Aísla la regla que decide si alguien es administrador.
import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";

//La sintaxis del nokmbre se pone asi por que sera una clase
export class CommunityPolicy{
    // Usamos 'static' para usar este método como una herramienta directa: CommunityPolicy.isAdmin(...)
    // Así evitamos tener que crear copias en memoria usando 'new CommunityPolicy()'
    static isAdmin(user : User,community : SelectCommunity) : boolean{
        return user.id === community.createdBy
    }

    static canEdit(user : User,community : SelectCommunity) : boolean{
        return this.isAdmin(user,community)
    }
    static canDelete(user : User,community : SelectCommunity) : boolean{
        return this.isAdmin(user,community)
    }
    static canViewMembers(user : User,community : SelectCommunity) : boolean{
        return this.isAdmin(user,community)
    }
}
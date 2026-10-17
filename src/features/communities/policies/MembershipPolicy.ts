import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";

export class MembershipPolicy{
    static canJoin(user : User, community : SelectCommunity, isMember : boolean) : boolean {
        if(isMember) return false//Por que no se puede unir alguien que ya es miembro
        //El admin no se puede unir
        if(community.createdBy === user.id) return false

        //Si no eres ninguno de los dos ifs anteriores te puedes unir :D
        return true
    }

    static canLeave(user : User, community : SelectCommunity, isMember : boolean) : boolean{
        //Owner no puede salir de su comunidad
        if(community.createdBy === user.id) return false

        //Si eres miembro te puedes salir
        return isMember
    }
}
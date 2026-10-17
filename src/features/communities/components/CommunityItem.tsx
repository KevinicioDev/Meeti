import Image from "next/image"
import { CommunityWithPermission } from "../types/community.types"
import Link from "next/link"
import CommunityDropdownMenu from "./CommunityDropdownMenu"

// Este "contrato" le asegura al componente que la propiedad 'community' traerá la estructura exacta.
// Gracias a esto, si escribimos 'community.data.' más abajo, VS Code nos dará autocompletado 
// y TypeScript nos avisará si intentamos usar un dato que no existe.
type Props = {
    community: CommunityWithPermission
}

export default function CommunityItem({community} : Props) {
    const { name, image, id, description} = community.data
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-start min-w-0 gap-x-4">
                <div className="size-32 flex-none overflow-hidden">
                    <Image
                    src={image || "/placeholder.jpg"}
                        alt={`Imagen Comunidad ${name}`}
                        className="object-cover w-full h-full"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="min-w-0 flex-auto">
                    <Link href={`/`} className="hover:underline font-bold text-lg">
                    {name}
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                    <p className="text-gray-600 text-sm"></p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                {/* DROPDOWN MENU */}
                {community.context.isAdmin && <CommunityDropdownMenu community={community.data}/>}
            </div>
        </li>
    )
}
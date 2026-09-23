import Heading from "@/shared/components/typography/Heading"
import { generatePageTitle } from "@/shared/utils/metadata"
import { Metadata } from "next"
import Link from "next/link"

const title = 'Comunidades a las que te Uniste'//Para renderizar algo el codigo
export const metadata: Metadata = { //Para poder colocar el titulo de pagina
    title: generatePageTitle(title)
}
export default function JooinedCommunitiesPage() {
    //React renderiza directamente los hijos en el DOM real sin crear ninguna etiqueta contenedora invisible en el HTML.
    //En lugar de usar los <div></div> es mejor usar los fragments
    return (
        <>
            <Heading>{title}</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a mis Comunidades</Link>
        </>
    )
}
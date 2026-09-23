// Importa tu función personalizada que verifica la sesión en la base de datos o cookies
import { requireAuth } from "@/src/lib/auth-server";
// Importa un componente visual para mantener el estilo de los títulos uniforme
import Heading from "@/src/shared/components/typography/Heading";
// Importa la herramienta de Next.js para forzar cambios de URL desde el servidor
import { redirect } from "next/navigation";

// Esta es la vista principal de la ruta "/dashboard"
export default async function DashboardPage() {

    // Server components pueden ser async, Client components no pueden ser async.
    // Al ser "async", el servidor espera (await) a que esta función termine antes de continuar.
    const { isAuth } = await requireAuth() // Trae un true o false sobre la sesion del usuario

    // Barrera de seguridad: Si no hay sesión válida (!isAuth), la ejecución de esta página
    // se cancela inmediatamente y el servidor envía al usuario a la pantalla de login.
    if (!isAuth) redirect('/auth/login') // Para revisar si el admin esta autenticado

    // Si la línea de arriba NO lo expulsó, significa que es un usuario válido. 
    // Por lo tanto, el servidor dibuja la página y se la envía al navegador.
    return (
        <>
            {/* Este es el contenido específico que se inyectará en el layout */}
            <Heading>Panel de Administración</Heading>
        </>
    )
}
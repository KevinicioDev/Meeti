// Importa el componente del panel (probablemente un menú lateral o barra de navegación superior)
import DashboardPanel from "@/shared/components/dashboard/DashboardPanel";
// Importa la librería de React
import React from "react";

// Aplica a todas las rutas que empiecen con /dashboard (ej. /dashboard/perfil, /dashboard/ajustes)
// El parámetro "children" representa la página específica que el usuario está visitando en ese momento.
export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        // Los fragmentos <> y </> agrupan elementos sin crear etiquetas HTML innecesarias en el navegador
        <>
            <div>
                {/* 1. Elemento estático: Este panel siempre será visible y no recargará al cambiar de página */}
                <DashboardPanel />

                {/* 2. Contenedor principal: Usa clases (probablemente Tailwind) para dar un espacio interno (py-10) 
                     y empujar el contenido a la derecha en pantallas grandes (lg:pl-72) para hacerle espacio al panel */}
                <main className="py-10 lg:pl-72">

                    {/* 3. Contenedor de ancho máximo: Centra el contenido y evita que se estire demasiado en pantallas gigantes */}
                    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                        {/* 4. Elemento dinámico: Aquí es donde "aterriza" mágicamente el código de cada página individual. 
                             Si entras a /dashboard/perfil, aquí se dibujará el perfil. */}
                        {children}

                    </div>
                </main>
            </div>
        </>
    )
}
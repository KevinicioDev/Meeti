import { signOut } from "@/lib/auth-client"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"

export default function UserMenu() {

    return (
        <Menu as="div" className="relative ml-3">
            <MenuButton className="text-gray-400 relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Abrir Menú de Usuario</span>
                <Bars3Icon className='size-6' />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
                <MenuItem>
                    <a
                        href={`/p`}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                    >
                        Ver tu Perfil
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                    >
                        Administra tu Perfil
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/dashboard/security"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                    >
                        Seguridad
                    </a>
                </MenuItem>
                <MenuItem>
                    <button
                        // Clases de Tailwind para darle diseño al botón
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                        // onClick se dispara justo en el momento en que el usuario hace clic.
                        // Usamos 'async' porque el proceso de cerrar sesión no es instantáneo (requiere internet).
                        onClick={async () => { // callback con arrow function
                            // 'await' pausa la ejecución de este bloque de código hasta que signOut termine su tarea.
                            // signOut es la función que se comunica con tu servidor de autenticación para invalidar la sesión.
                            await signOut({
                                // Le pasamos opciones adicionales para decirle qué hacer después de comunicarse con el servidor
                                fetchOptions: {//Opciones de peticion
                                    // 'onSuccess' es un evento (callback) que se dispara ÚNICAMENTE si el 
                                    // servidor responde: "¡Éxito! La sesión se cerró correctamente".
                                    onSuccess: () => {
                                        // Si todo salió bien, redirigimos al usuario a la pantalla de login.
                                        redirect('/auth/login')
                                    }
                                }
                            })
                        }} // ejecuta ese codigo y cierra la sesion
                    >
                        Cerrar Sesión
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}
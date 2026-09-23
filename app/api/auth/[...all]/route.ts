import { toNextJsHandler } from 'better-auth/next-js'
// Importa el adaptador que permite utilizar Better Auth
// dentro de las rutas de Next.js.

import { auth } from '@/lib/auth'
// Importa nuestra configuración de Better Auth.
// Aquí es donde configuramos cómo funcionará la autenticación.

export const { GET, POST } = toNextJsHandler(auth)
// Convierte nuestra configuración de Better Auth en handlers
// que Next.js puede utilizar para recibir peticiones GET y POST.
//
// GET → Maneja peticiones GET relacionadas con la autenticación.
// POST → Maneja peticiones POST, por ejemplo iniciar sesión o registrarse.
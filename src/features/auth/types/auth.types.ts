import {auth} from '@/lib/auth'
//Mientras se hagan cambios en la configuracion 'auth' se ira actualizando 
export type User = typeof auth.$Infer.Session.user
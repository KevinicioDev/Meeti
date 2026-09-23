import { createAuthClient} from 'better-auth/react'

//En la parte de cliente no se puede colocar un metodo de servidor y viceversa
export const { signOut} = createAuthClient()
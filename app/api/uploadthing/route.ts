//De aqui es de donde se envian las peticiones
/**Al estar ubicado en app/api/uploadthing/route.ts, expone la ruta pública /api/uploadthing.
 *createRouteHandler genera automáticamente los métodos GET y POST que los servidores de UploadThing y tu cliente web necesitan para negociar tokens temporales de subida y confirmar webhooks. */
import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

export const {GET, POST} = createRouteHandler({
    router : ourFileRouter
})
//Botones a utilizar para react
//Estas funcoines nos permitiran crewar botones para poder utilizar en nuestros componentes
//*SOLO SE PUEDEN UTILIZAR EN COMPONENTES DE CLIENTE*
/**Este archivo funciona como una fábrica de componentes visuales con tipado estricto (Type-Safe) para el frontend. */
import { generateUploadButton, generateUploadDropzone} from '@uploadthing/react'
/**Al ser un import type, no añade peso a la compilación final; solo sirve para que el compilador de TypeScript conozca qué endpoints existen en el servidor. */
import type { OurFileRouter } from '../../../app/api/uploadthing/core'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropZone = generateUploadDropzone<OurFileRouter>()

/**¿Por qué llevan <OurFileRouter>?: Al pasarle ese tipo genérico, los componentes adquieren autocompletado en VS Code. Cuando uses <UploadButton endpoint="..."/>,
 *TypeScript te sugerirá automáticamente "meetiUploader". Si escribes mal el nombre del endpoint, te marcará error antes de guardar. */
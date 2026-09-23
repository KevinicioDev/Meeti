// Importamos el tipo que contiene todas las propiedades
// que puede recibir un elemento <label> de HTML.
import { LabelHTMLAttributes } from 'react'

// Creamos un tipo llamado Props.
// LabelHTMLAttributes<HTMLLabelElement> permite que nuestro componente
// pueda recibir las mismas propiedades que un <label> normal.
type Props = LabelHTMLAttributes<HTMLLabelElement>

// Creamos nuestro componente FormLabel.
// "props" contiene todos los valores que le pasemos al componente.
export default function FormLabel(props: Props) {
    return (
        // {...props} pasa todas las propiedades recibidas al <label>.
        // className="block" agrega la clase de Tailwind "block".
        //
        // props.children contiene el contenido que coloquemos
        // dentro de <FormLabel>...</FormLabel>.
        <label {...props} className="block">{props.children}</label>
    )
}
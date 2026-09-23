// Importa la interfaz que contiene todos los atributos HTML estándar de un textarea (placeholder, rows, value, onChange, etc.)
import { TextareaHTMLAttributes } from 'react'

// Define el tipo de las props heredando los atributos nativos de un <textarea>.
// <HTMLTextAreaElement> especifica el tipo exacto de elemento del DOM para tipar eventos (ej. e.currentTarget.value) y referencias (ref).
type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function FormTextArea(props: Props) {
    // {...props} pasa automáticamente todos los atributos recibidos (id, placeholder, value, etc.) directamente al elemento nativo
    return <textarea {...props} className='border border-slate-200 w-full p-2 h-40' />
}
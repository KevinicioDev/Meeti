import clsx from 'clsx'
import {InputHTMLAttributes} from 'react'
type Props = InputHTMLAttributes<HTMLInputElement>
export default function FormInput(props : Props) {
    const {className} = props//Para extraer los valores en caso de pasarselos
    return (
        <input
            {...props}
            //Si se le pasa clases adicionales las va a tomar
            className={clsx("border border-slate-200 w-full p-2", className)}
        />
    )
}

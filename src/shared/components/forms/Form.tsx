import {FormHTMLAttributes} from 'react'
import clsx from 'clsx'

//Este type de props ya puede utilizar todos los elementos que puede usar un Formulario html
type Props = FormHTMLAttributes<HTMLFormElement>

//Children va renderizar lo que se le pase
export default function Form(props : Props) {
    const {className} = props
    return (
        //...props es para que los props que se le pasen los va asignar dentro del formulario
        <form {...props} className={clsx("mt-10 space-y-3", className)}>
            {props.children}
        </form>
    )
}

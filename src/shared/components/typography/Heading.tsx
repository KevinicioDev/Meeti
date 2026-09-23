import clsx from "clsx"
import React from "react"

// Define las propiedades que recibe el componente
type Props = {
    // Contenido que se muestra dentro del Heading
    children?: React.ReactNode

    // Nivel del encabezado, del 1 al 6
    level?: 1 | 2 | 3 | 4 | 5 | 6

    // Permite agregar clases adicionales
    className?: string
}

// Crea el componente Heading
export default function Heading({ children, level = 1, className }: Props) {

    // Crea dinámicamente el elemento h1, h2, h3, etc.
    const Tag: React.ElementType = `h${level}`

    // Define el tamaño de cada nivel del Heading
    const sizeMap: Record<number, string> = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-sm',
    }

    return (
        // Combina las clases de Tailwind
        <Tag className={clsx(
            'font-black uppercase',
            sizeMap[level],
            className
        )}>
            {children}
        </Tag>
    )
}
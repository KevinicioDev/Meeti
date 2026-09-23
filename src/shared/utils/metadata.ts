// Genera el título de una página usando el nombre de la aplicación
export function generatePageTitle(title: string) {

    // Combina el nombre de la aplicación con el título de la página
    return `${process.env.APP_NAME} - ${title}`
}
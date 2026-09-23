//Configuracion para los emails
export const emailConfig = {
    from: {
        verification: 'Meeti <cuentas@meeti.com>',//Cuenta que envia la verificacion
        passwordReset: 'Meeti <admin@meeti.com>',//Cuenta que envia el password reset
        default: 'Meeti <noreply@meeti.com>'
    },
    tokenExpiration: '1 hora'
} as const
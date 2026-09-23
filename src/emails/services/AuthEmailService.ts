import { PasswordResetEmailData, VerificationEmailData } from "../types/email.types";
import { EmailService } from "./EmailService";
import { emailConfig } from "../config/config";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/VerificationEmail";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/PasswordResetEmail";
export class AuthEmailService {
    //Metodo para enviar email de verificacion
    static async sendVerificationEmail(data : VerificationEmailData) : Promise<void>{//Es una funcion asincrona con un promise y no retorna nada
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Meeti - Confirma tu Cuenta',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data),
        })
    }

    //Usamos como type PasswordResetEmailData, tiene, email, name, url
    static async sendPasswordResetToken(data : PasswordResetEmailData) : Promise<void>{//Promise por que es asincrono
        await EmailService.send({//Utilizamos EmailService.send para usar el mismo metodo para enviar email
            from : emailConfig.from.passwordReset,//Es quien lo envia
            to : data.email,//Hacia a donde lo vamos a enviar
            subject : 'Meeti - Reestablece tu Password',//Asunto
            text : renderPasswordResetEmailText(data),//Version de texto
            html : renderPasswordResetEmail(data)//Version en html
        })
    }
}
import nodemail from 'nodemailer';
require('dotenv').config()

    const remetente = nodemail.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.HOST_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    })
    
    export function EnviarEmail(destinatario: string, tituloemail: string, textoemail: string){
        const emailenviado = {
            from: `Fazenda Eletrônica ${process.env.HOST_EMAIL}`,
            to: destinatario,
            subject: tituloemail,
            html: textoemail
        }
        
        remetente.sendMail(emailenviado, function(error){
            if(error){
                console.log(error)
            }
        })
    }
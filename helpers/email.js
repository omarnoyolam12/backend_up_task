import nodemailer from "nodemailer";

const emailRegistro = async (datos)=>{
    
    const{nombre, email, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // *Información de email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `
        <div style="width: 100%; background: #1e293b; font-family: Arial, Helvetica, sans-serif;">
            <div style="width: 50%; margin: 0 auto;">
                <div style="background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center">
                    <h1 style="text-align: center; font-size: 56px; color: #818cf8;">Bienvenido</h1>
                </div>
            
                <div style="background: white; padding: 20px 80px; color: #334155">
                    <p style="font-weight: 700; font-size: 24px;">
                        Hola, ${nombre}
                    </p>
                    <p style="line-height: 1.6">
                        Te damos la bienvenida a la app UpTask, empieza a gestionar tus tareas con facilidad confirmando tu cuenta en el siguiente enlace, toda la información que el equipo necesita en un solo lugar.
                    </p>
                    <a style="display: inline-block; margin-top: 30px; padding: 10px 20px; background: #6366f1; border-radius: 10px; color: white; text-decoration: none" href="${process.env.FRONTEND_URL}/confirmar/${token}">
                        Confirmar Cuenta
                    </a>
                </div>
            </div>
        
        </div>
        
        `
    })
}


const emailRecuperar = async (datos)=>{
    
    const{nombre, email, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // *Información de email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Recupera tu acceso",
        text: "Recupera el acceso a tu cuenta",
        html: `
        <div style="width: 100%; background: #1e293b; font-family: Arial, Helvetica, sans-serif;">

            <div style="width: 50%; margin: 0 auto;">
                <div style="background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center">
                    <h1 style="text-align: center; font-size: 56px; color: #818cf8;">UpTask</h1>
                </div>
            
                <div style="background: white; padding: 20px 80px; color: #334155">
                    <p style="font-weight: 700; font-size: 24px; text-align: center">
                        Hola ${nombre} ¿Olvidaste tu contraseña?
                    </p>
                <p style="line-height: 1.6">
                    ¡A todos nos pasa! Para iniciar sesión, por favor da clic en el botón de abajo y sigue las instrucciones.
                </p>
                    <p style="line-height: 1.6">
                    Si no tienes una cuenta en UpTask o no es el correo asociado a tu cuenta, o no solicitaste este email, omite este mensaje.
                </p>
                    <div style="display: flex; justify-content: center">
                        <a style="display: inline-block; margin-top: 30px; padding: 10px 20px; background: #6366f1; border-radius: 10px; color: white; text-decoration: none;" href="${process.env.FRONTEND_URL}/olvide-password/${token}">
                        Recupera tu contraseña
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
        
        `
    })
}

export {
    emailRegistro,
    emailRecuperar
}
import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailRecuperar } from "../helpers/email.js";

// *Registrar Usuario-------------------------------------------
const registrar = async (req, res)=>{

    // *Evitar registros duplicados------------------------------
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }
    
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();

        await usuario.save();

        // *Enviar email de confirmacion
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token,
        });
        
        res.json({msg: 'Usuario creado correctamente, revisa tu email para confrima tu cuenta'});

    } catch (error) {
        console.log(error);
    }
}

// *Autenticar Usuario-------------------------------------------
const autenticar = async (req, res)=>{

    const {email, password} = req.body;

    // *Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        const error = new Error('Usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    // *Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(400).json({msg: error.message});
    }

    // *Comprobar el password
    if(await usuario.comprobarPassword(password)){
        res.json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    }
    else{
        const error = new Error('El password es incorrecto');
        return res.status(400).json({msg: error.message});
    }

}

// *Confirmar cuenta de usuario-----------------------------------
const confirmar = async (req, res)=>{
    
    const {token} = req.params;
    
    const usuarioConfirmar = await Usuario.findOne({token});
    
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message});
    }

    try {
        // *Confirmar usuario y borrar token
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';

        // *Guardar los datos
        await usuarioConfirmar.save();

        // *Confirmación
        res.json({msg: 'Cuenta confirmada correctamente, ya puedes comenzar'});

    } catch (error) {
        console.log(error);
    }
}

// *Olvide password-----------------------------------------------
const olvidePassword = async (req, res)=>{

    const {email} = req.body;

    const existeUsuario = await Usuario.findOne({email});

    if(!existeUsuario){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        // *Generar un nuevo token
        existeUsuario.token = generarId();
        await existeUsuario.save();

        // *Enviar email
        emailRecuperar({
            nombre: existeUsuario.nombre,
            email: existeUsuario.email,
            token: existeUsuario.token
        });
        
        // *Mensaje
        res.json({msg: 'Hemos enviado un email con las instrucciones'});
    
    } catch (error) {
        console.log(error);
    }
}

// *Comprobar token de olvido de password¨-------------------------------
const comprobarToken = async (req, res)=>{

    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token});

    if(tokenValido){
        res.json({msg: 'Token valido'});
    }
    else{
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
}

// *Nuevo password------------------------------------------------------
const nuevoPassword = async (req, res)=>{

    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token});

    if(usuario){
        
        try {
            // *Reescribir el password
            usuario.password = password;

            // *Eliminar token
            usuario.token = '';

            // *Guardar usuario
            await usuario.save();

            // *Mensaje
            res.json({msg: 'Password Modificado Correctamente'});

        } catch (error) {
            console.log(error);    
        }

    }
    else{
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }

}

const perfil = async (req, res)=>{
    
    const {usuario} = req;
    
    res.json(usuario);
}

export {
    registrar,
    autenticar, 
    confirmar,
    olvidePassword, 
    comprobarToken,
    nuevoPassword,
    perfil
}
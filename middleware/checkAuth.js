import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next)=>{
    
    let token;

    // *Comprobar si estamos mandando el JWT
    // ?Header es lo que envia primero nuestra petición
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            // *Guardar token separandolo de Bearer
            token = req.headers.authorization.split(' ')[1];
            
            // *Decodificando el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // *Buscar el usuario (Se crea la variable usuario en el request)
            req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v');
            
            return next();

        } catch (error) {
            return res.status(404).json({msg: 'Hubo un error al verificar'});
        }
    }

    if(!token){
        const error = new Error('Token no valido');
        res.status(401).json({msg: error.message});
    }
}

export default checkAuth;
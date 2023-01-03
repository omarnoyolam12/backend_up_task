import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

// *Agregar tarea---------------------------------------------------------
const agregarTarea = async (req, res)=>{
    
    const {proyecto} = req.body;

    // *Identificar si existe el proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    if(!existeProyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({msg: error.message});
    }

    // *Comprobar si la persona autenticada creo el proyecto
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos para añadir tareas');
        return res.status(403).json({msg: error.message});
    }

    try {
        
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada);

    } catch (error) {
        console.log(error);    
    }

}

// *Obtener tarea---------------------------------------------------------
const obtenerTarea = async (req, res)=>{

    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    // *Comprobar si la terea existe
    if(!tarea){
        const error = new Error('No existe la tarea');
        return res.status(404).json({msg: error.message});
    }
    
    // *Comprobar si el que añade la tarea es el creador
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(403).json({msg: error.message});
    }

    return res.json(tarea);

}

// *Actualizar tarea-------------------------------------------------------
const actualizarTarea = async (req, res)=>{

    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    // *Comprobar si la terea existe
    if(!tarea){
        const error = new Error('No existe la tarea');
        return res.status(404).json({msg: error.message});
    }
    
    // *Comprobar si el que añade la tarea es el creador
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(403).json({msg: error.message});
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        
        const tareaAlmacenada = await tarea.save();
        return res.json(tareaAlmacenada);
        
    } catch (error) {
        console.log(error);
    }

}

// *Eliminar tarea----------------------------------------------------
const eliminarTarea = async (req, res)=>{

    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    // *Comprobar si la terea existe
    if(!tarea){
        const error = new Error('No existe la tarea');
        return res.status(404).json({msg: error.message});
    }
    
    // *Comprobar si el que añade la tarea es el creador
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(403).json({msg: error.message});
    }

    try {
        
        await tarea.deleteOne();
        return res.json({msg: 'Tarea eliminada'});
        
    } catch (error) {
        console.log(error);
    }
}

const cambiarEstado = async (req, res)=>{

}

export{
    agregarTarea,
    obtenerTarea,
    actualizarTarea, 
    eliminarTarea,
    cambiarEstado
}
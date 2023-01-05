import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";

// *Obtener proyectos de la persona autenticada--------------------------
const obtenerProyectos = async (req, res)=>{
    
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select('-tareas');
    res.json(proyectos);
}

// *Crear un proyecto-----------------------------------------------------
const nuevoProyecto = async (req, res)=>{

    // *Crear una nueva instacincia del modelo proyecto
    const proyecto = new Proyecto(req.body);

    // *Asignar el creador al usuario existente en req.usuario
    // ?req.usuario proviene del checkAuth
    proyecto.creador = req.usuario._id;

    try {
        
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);

    } catch (error) {
        console.log(error);
    }
}

// *Obtener un proyecto en particular---------------------------------------
const obtenerProyecto = async (req, res)=>{

    const {id} = req.params;
    
    const proyecto = await Proyecto.findById(id).populate('tareas');

    // *No existe el proyecto
    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({msg: error.message});
    }

    // *El proyecto debe ser creado por el usuario autenticado 
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(400).json({msg: error.message});
    }

    // *Obtener las tareas del proyecto
    // const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);

    return res.json(proyecto);
}

// *Editar proyecto--------------------------------------------------------
const editarProyecto = async (req, res)=>{
    
    const {id} = req.params;
    
    const proyecto = await Proyecto.findById(id);

    // *No existe el proyecto
    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({msg: error.message});
    }

    // *El proyecto debe ser creado por el usuario autenticado 
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(400).json({msg: error.message});
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;
    proyecto.color = req.body.color || proyecto.color;

    try {
        
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);

    } catch (error) {
        console.log(error);
    }
    
}

// *Eliminar un proyecto------------------------------------------------
const eliminarProyecto = async (req, res)=>{

    const {id} = req.params;
    
    const proyecto = await Proyecto.findById(id);

    // *No existe el proyecto
    if(!proyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({msg: error.message});
    }

    // *El proyecto debe ser creado por el usuario autenticado 
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no válida');
        return res.status(400).json({msg: error.message});
    }

    try {
        
        await proyecto.deleteOne();
        res.json({msg: 'Este proyecto ha sido eliminado correctamente.'});

    } catch (error) {
        console.log(error);
    }
}

const agregarColaborador = async (req, res)=>{

}

const eliminarColaborador = async (req, res)=>{

}

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}


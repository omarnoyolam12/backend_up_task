import mongoose from "mongoose";
import formatearFecha from "../helpers/formatearFecha.js";

// *Definiendo el esquema de proyectos-----------------------------------
const proyectosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    color: {
        type: String,
        required: true
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
}, {
    timestamps: {currentTime: formatearFecha}
});

const Proyecto = mongoose.model('Proyecto', proyectosSchema);
export default Proyecto;
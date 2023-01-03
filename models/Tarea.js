import mongoose from "mongoose";

// *Definir el esquema de tarea---------------------------------------
const tareaSchema = mongoose.Schema({
    tarea: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: false,
    },
    fechaEntrega: {
        type: Date,
        required: true,
        default: Date.now()
    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
}, {
    timestamps: true
});

const Tarea = mongoose.model('Tarea', tareaSchema);
export default Tarea;
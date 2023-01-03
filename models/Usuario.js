import mongoose from "mongoose";
import bcrypt from "bcrypt";
import formatearFecha from "../helpers/formatearFecha.js";

// *Definir el esquema de usuario--------------------------------------------
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    token: {
        type: String
    },
    foto_perfil:{
        type: String,
        default: null
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
}, {
    // *Agregar dos columnas de agregado y actualizado
    timestamps: {currentTime: formatearFecha}
});

// *Hashear el password antes de guardar el registro---------------------------
usuarioSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// *Comprobar el password-------------------------------------------------------
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario; 
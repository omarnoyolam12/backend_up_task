import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

// *Crear el servidor-------------------------------------------------
const app = express();

// *Procesar respuestas json------------------------------------------
app.use(express.json());

// *Habilitar variables de entorno------------------------------------
dotenv.config()

// *Conectar la base de datos-----------------------------------------
conectarDB();

// *Conectar CORS-----------------------------------------------------
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){

        // *Origin contiene la URL dónde se hace la petición
        if(whiteList.includes(origin)){
            // *Puede consultar la API
            callback(null, true);
        }
        else{
            // *No esta permitido
            callback(new Error("Error de CORS"));
        }
    }
}

app.use(cors(corsOptions));

// *Routing-----------------------------------------------------------
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

// *Crear variable para correr en un puerto---------------------------
const PORT = process.env.PORT || 4000;

// *Corriendo servidor en el puerto----------------------------------- 
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
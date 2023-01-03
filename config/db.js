import mongoose from "mongoose";

const conectarDB = async ()=>{

    try {
        
        const conexion = await mongoose.connect(process.env.MOONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 

        const url = `${conexion.connection.host} : ${conexion.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {

        //! Mostrar un mensaje si hubo un error en la base de datos
        console.log(`error: ${error.message}`);

        //! Forzar que el proceso termine en caso de error
        process.exit(1);
    }
}

export default conectarDB;
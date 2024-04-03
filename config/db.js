//Importación de libreria SQL
const mysql = require('mysql2/promise');

// Conexión con la BD
const pool = mysql.createPool({
    host: 'database-2.c500mygg6ofc.us-east-2.rds.amazonaws.com',
    user: 'adminmexp',//usuario
    password: 'A3xBuxsK',//contraseña
    port:   3306,//puerto
    database: 'mexp',//db
});


pool.on('connection', connection =>{
    connection.query('SET time_zone="-06:00";',err =>{
        if(err){
            console.log(err);
            return;
        }
    });
});


module.exports = { pool };


//// IMPORTACIÓN DE LA LIBRERÍA DE MONGOOSE
//const mongoose = require('mongoose')
//require('dotenv').config()
//
//// FUNCIÓN PARA REALIZAR UNA CONEXIÓN CON BASE DE DATOS
//const connectDB = async () => {
//	try {
//		// CONEXIÓN A BASE DE DATOS
//		// IMPORTANTE UTILIZAR NUESTRA VARIABLE DE ENTORNO CON PROCESS.ENV
//		await mongoose.connect(process.env.MONGODB_URI, {
//			useNewUrlParser: true,
//			useUnifiedTopology: true,
//		})
//
//		// EXPRESAR EN TERMINAL QUE NUESTRA BASE DE DATOS FUE CONECTADA CORRECTAMENTE
//		console.log('Base de datos conectada')
//	} catch (error) {
//		console.log(error)
//		process.exit(1) // DETIENE LA APP POR COMPLETO
//	}
//}
//
//// EXPORTACIÓN DE LA FUNCIÓN PARA ACCESO
//module.exports = connectDB
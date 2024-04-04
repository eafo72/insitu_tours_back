const cron = require('node-cron')
const express = require('express')
const cors = require('cors')

const app = express()
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const categoriaRoutes = require('./routes/categoria')
const empresaRoutes = require('./routes/empresa')
const guiaRoutes = require('./routes/guia')
const tourRoutes = require('./routes/tour')
const fotosTourRoutes = require('./routes/foto')
const fechaTourRoutes = require('./routes/fecha-tour')
const rutasTourRoutes = require('./routes/rutas-tour')
const viajeTourRoutes = require('./routes/viaje-tour')
const comentarioRoutes = require('./routes/comentario')
const ventaRoutes = require('./routes/venta')

const db = require('./config/db')


require('dotenv').config()

app.use(cors())
app.use(express.json())

async function cronTour(){    
    try {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let fecha = date + ' ' + time;

        let query = `UPDATE viajeTour SET
                        updated_at    = '${fecha}', 
                        status_viaje  = 'realizado'
                        WHERE fecha_regreso < '${fecha}' AND status_viaje = 'en curso' OR  
                        fecha_regreso < '${fecha}' AND status_viaje = 'proximo'`;

        let result = await db.pool.query(query);
        result = result[0];

        console.log("Cron job realizado");
        

    } catch (error) {
        console.log(error);
        console.log("Cron job NO realizado");
    }
}    

//CRON para marcar como terminados los tours que no termino el guia
//At 01:00 on every day-of-week from Sunday through Saturday. www.crontab.guru
cron.schedule("0 1 * * 0-6", function () {
    console.log("---------------------");
    console.log("running a cron job every day");
    
    cronTour();

});

//3. Rutas
app.use('/usuario', userRoutes)
app.use('/admin/admin', adminRoutes)
app.use('/admin/categoria', categoriaRoutes)
app.use('/admin/empresa', empresaRoutes)
app.use('/admin/guia', guiaRoutes)
app.use('/admin/tour', tourRoutes)
app.use('/admin/fotos-tour', fotosTourRoutes)
app.use('/admin/fecha-tour', fechaTourRoutes)
app.use('/admin/rutas-tour', rutasTourRoutes)
app.use('/admin/viaje-tour', viajeTourRoutes)
app.use('/cliente/comentario', comentarioRoutes)
app.use('/venta', ventaRoutes)

app.get('/', (req, res) => res.send('MEZCANAUTIC --TOURS-- API'))

// 4. SERVIDOR
//app.listen(process.env.PORT, () => {
//	console.log('El servidor está corriendo en 4000')
//})
app.listen(4000)
console.log('Server running on port 4000');
import express from 'express'
import { myApp } from './firebase.js'
import Usuarios from './models/Usuarios.js'
import Proyecto from './models/Proyecto.js'
import usuariosRutas from './routes/usuariosRutas.js'
import proyectosRutas from './routes/proyectosRutas.js'
import dotEnv from 'dotenv'
dotEnv.config()

const app = express()
const port = 3001

app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/usuarios', usuariosRutas)
app.use('/proyectos', proyectosRutas)

app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`)
  )

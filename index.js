import express from 'express'
import { myApp, db } from './firebase.js'
import Usuarios from './models/Usuarios.js'
import Proyecto from './models/Proyecto.js'
import usuariosRutas from './routes/usuariosRutas.js'
import proyectosRutas from './routes/proyectosRutas.js'
import estadisticasRutas from './routes/estadisticasRutas.js'
import usuarioExtraido from './middlewares/usuarioExtraido.js'
import dotEnv from 'dotenv'
import ws from 'express-ws'
import { collection, getDocs, onSnapshot, orderBy, limit, query, doc} from 'firebase/firestore'
import requestIp from 'request-ip'
import jwt from 'jsonwebtoken'
dotEnv.config()

const app = express()
let expressWs = ws(app)
const port = 3001

app.use(express.json())
app.use(requestIp.mw())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.ws('/proyectos/cargarEstadisticas', async (ws, req) => {
  req.IDusuario = jwt.verify(req.query.tokenUsuario, process.env.SECRET).id
  const q = query(collection(db,'Usuarios',req.IDusuario,'proyectos',req.query.idProyecto,'estadisticas'), orderBy('fecha', 'desc'), limit(1))
  const unsub = await onSnapshot(q,
      (doc) => {
        if(doc.docs[0] === undefined) return null
        ws.send(JSON.stringify(doc.docs[0].data()))
    }
  )



  ws.on('message', function incoming(message) {
    if (message === 'disconnect') {
      unsub()
      console.log('listener de bbdd desactivado por la orden: ', message)
    }
  })
  ws.on('close', function incoming(message) {
    console.log('closing')
    unsub()
  })
})

app.ws('/proyectos/cargarLogs', async (ws, req) => {
  let stats = []
  const unsub = await onSnapshot(
    collection(
      db,
      'Usuarios',
      req.query.idUsuario,
      'proyectos',
      req.query.idProyecto,
      'logs'
    ),
    (doc) => {
      doc.forEach((d) => {
        console.log('dentro de onSnapshot ==> ', d.data())
        stats.push(d.data())
      })
      ws.send(JSON.stringify(stats))
    }
  )
  ws.on('message', function incoming(message) {
    if (message === 'disconnect') {
      unsub()
      console.log('listener de bbdd desactivado por la orden: ', message)
    }
  })
  ws.on('close', function incoming(message) {
    console.log('closing')
    unsub()
  })
})

app.use('/usuarios', usuariosRutas)
app.use('/proyectos', proyectosRutas)
app.use('/estadisticas', estadisticasRutas)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

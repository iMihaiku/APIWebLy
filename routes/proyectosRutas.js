import express from 'express'
import Proyecto from '../models/Proyecto.js'
const proyectosRutas = express.Router()
import usuarioExtraido from '../middlewares/usuarioExtraido.js'
//addListener for create

proyectosRutas.post('/crear', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto(
    '',
    req.body.titulo,
    req.body.descripcion,
    '',
    req.body.URLDomain
  )
  proyecto.crearProyecto(req.IDusuario).then((data) => {
    res.send(data)
  })
})

proyectosRutas.get('/cargarProyectos', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto()
  proyecto.cargarProyectos(req.IDusuario).then((data) => {
    res.send(data)
  })

})
proyectosRutas.post('/crearEstadistica', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto(req.body.id)
  proyecto.crearEstadistica(req.IDusuario).then((data) => {
    res.send(data)
  })
})
proyectosRutas.get('/cargarEstadisticas', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto(req.query.id)
  proyecto.cargarEstadisticas(req.IDusuario).then((data) => {
    res.send(data).status(200)
  })
})
proyectosRutas.get('/cargarLogs', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto(req.query.id)
  proyecto.cargarLogs(req.IDusuario).then((data) => {
    console.log(data)
    res.send(data).status(200)
  })
})
proyectosRutas.delete('/borrarProyecto', usuarioExtraido, async (req, res) => {
  let proyecto = new Proyecto(req.body.id)
  proyecto.borrarProyecto(req.IDusuario).then((data) => {
    res.send(data)
  })
})

export default proyectosRutas

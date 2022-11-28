import express from 'express'
import Proyecto from '../models/Proyecto.js'
import Estadistica from '../models/Estadistica.js'
const estadisticasRutas = express.Router()
import usuarioExtraido from '../middlewares/usuarioExtraido.js'

estadisticasRutas.post('/agregarEstadisticas', usuarioExtraido, async (req, res) => {
  let estadistica = new Estadistica(req.body.idProyecto, req.body.visitas, req.body.ips, req.body.eventos )
  estadistica.agregarEstadisticas(req.IDusuario).then((data) => {
    res.send(data).status(200)
  })
})
estadisticasRutas.post('/cargarEstadisticas', usuarioExtraido, async (req, res) => {
  let estadistica = new Estadistica(req.body.id)
  estadistica.cargarEstadisticas(req.IDusuario).then((data) => {
    res.send(data).status(200)
  })
})

estadisticasRutas.post('/validar', usuarioExtraido, async (req, res) => {
  const ip = req.clientIp
  let proyecto = new Proyecto(req.body.id)
  proyecto.validarProyecto(req.IDusuario, ip).then((data) => {
    res.send(data)
  })
})

export default estadisticasRutas

import express from 'express'
import Usuarios from '../models/Usuarios.js'
import usuarioExtraido from '../middlewares/usuarioExtraido.js'
const usuariosRutas = express.Router()

usuariosRutas.post('/login', (req, res) => {
  let usuario = new Usuarios("", req.body.email, req.body.hashpass, "")
  usuario.login().then((data) => {
    res.send(data)
  })
})
usuariosRutas.post('/registro', (req, res) => {
  let usuario = new Usuarios("", req.body.email, req.body.hashpass, 'user')
  usuario.registro().then((data) => {
    res.send(data)
  })
})
usuariosRutas.delete('/borrar', usuarioExtraido, async (req, res) => {
  let usuario = new Usuarios(req.body.id, req.body.email, req.body.hashpass, req.body.auth)
  usuario.borrarUsuario(req.IDusuario).then((data) => {
    res.send(data)
  })
})

export default usuariosRutas
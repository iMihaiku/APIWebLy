import jwt from 'jsonwebtoken'
const usuarioExtraido = (req, res, next) => {
  const autorizacion = req.get('authorization')
  console.log(autorizacion);
  let token = null
  let decodedToken = null
  if (autorizacion && autorizacion.toLowerCase().startsWith('bearer')) {
    token = autorizacion.split(' ')[1]
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token no valido o no existente' })
  }
  req.IDusuario = decodedToken.id+""
  next()
}
export default usuarioExtraido
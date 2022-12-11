import {borrarUsuario, crearUsuario, loginUsuario} from '../controllers/usuariosController.js';
class Usuarios 
{
    constructor(id, email, hashpass, auth) {
        this.id = id
        this.email = email
        this.hashpass = hashpass
        this.auth = auth
    }
    //metodo para crear usuarios
    async borrarUsuario(IDusuario) { return await borrarUsuario(this.id, this.auth, IDusuario)}
    async registro() { return await crearUsuario(this.email, this.hashpass, this.auth)}
    async login() { return await loginUsuario(this.email, this.hashpass)}
}
export default Usuarios
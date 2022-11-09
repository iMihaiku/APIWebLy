import {cargarProyectos, crearProyecto, borrarProyecto} from '../controllers/proyectosController.js';
class Proyecto 
{
    constructor(id, titulo, descripcion, fechaCreacion, tokenAPI) {
        this.id = id
        this.titulo = titulo
        this.descripcion = descripcion
        this.fechaCreacion = fechaCreacion
        this.tokenAPI = tokenAPI
    }
    async crearProyecto(IDusuario) { crearProyecto(this.titulo, this.descripcion, IDusuario)}
    async cargarProyectos(IDusuario) { return await cargarProyectos(IDusuario)}
    async borrarProyecto(IDusuario) { return await borrarProyecto(this.id, IDusuario)}
}
export default Proyecto
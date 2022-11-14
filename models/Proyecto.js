import { cargarProyectos, crearProyecto, borrarProyecto, cargarLogs } from '../controllers/proyectosController.js';
class Proyecto 
{
    constructor(id, titulo, descripcion, fechaCreacion, URLDomain ,tokenAPI) {
        this.id = id
        this.titulo = titulo
        this.descripcion = descripcion
        this.fechaCreacion = fechaCreacion
        this.URLDomain = URLDomain
        this.tokenAPI = tokenAPI
        this.logs = []
    }
    async crearProyecto(IDusuario) { return await crearProyecto(this.id, this.titulo, this.descripcion, this.URLDomain, IDusuario)}
    async cargarProyectos(IDusuario) { return await cargarProyectos(IDusuario)}
    async cargarLogs(IDusuario) { return await cargarLogs(IDusuario, this.id)}
    async borrarProyecto(IDusuario) { return await borrarProyecto(this.id, IDusuario)}
}
export default Proyecto
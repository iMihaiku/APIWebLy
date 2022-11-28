import { cargarProyectos, crearProyecto, borrarProyecto, cargarLogs, cargarEstadisticas, crearEstadistica, agregarEstadisticas, validar } from '../controllers/proyectosController.js';
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
    async borrarProyecto(IDusuario) { return await borrarProyecto(this.id, IDusuario)}

    
    async validarProyecto(IDusuario, ip) { return await validar(this.id, IDusuario, ip)}
    async agregarEstadisticas(IDusuario) { return await agregarEstadisticas(this.id, IDusuario)}
    async crearEstadistica(IDusuario) { return await crearEstadistica(this.id, IDusuario)}
    async cargarEstadisticas(IDusuario) { return await cargarEstadisticas(IDusuario, this.id)}
    async cargarLogs(IDusuario) { return await cargarLogs(IDusuario, this.id)}

}
export default Proyecto
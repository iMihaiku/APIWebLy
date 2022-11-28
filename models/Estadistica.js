import { crearEstadistica, agregarEstadisticas, cargarEstadisticas} from '../controllers/proyectosController.js';
class Estadistica 
{
    constructor(idProyecto, visitas, ips, eventos) {
        this.idProyecto = idProyecto
        this.visitas = visitas
        this.ips = ips
        this.eventos = eventos
    }    
    async agregarEstadisticas(IDusuario) { return await agregarEstadisticas(this.idProyecto, IDusuario, this.visitas, this.ips, this.eventos)}
    async crearEstadistica(IDusuario) { return await crearEstadistica(this.id, IDusuario)}
    async cargarEstadisticas(IDusuario) { return await cargarEstadisticas(IDusuario, this.idProyecto)}
    async cargarLogs(IDusuario) { return await cargarLogs(IDusuario, this.id)}

}
export default Estadistica
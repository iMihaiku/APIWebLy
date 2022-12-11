import { myApp, db } from '../firebase.js'
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  onSnapshot,
  where
} from 'firebase/firestore'

async function crearProyecto(titulo, descripcion, URLDomain, IDusuario) {
  let res

  const documento = {
    title: titulo,
    descprition: descripcion,
    creationDate: new Date(),
    id: 0,
    state: 'offline',
    URLDomain: URLDomain
  }
  try {
    const docRef = await getDocs(collection(db, 'Usuarios', IDusuario, 'proyectos'))
    docRef.forEach((doc) => {
      documento.id = doc.data().id + 1
    })
    await setDoc(
      doc(db, 'Usuarios', IDusuario, 'proyectos', documento.id + ''),
      documento
    )
    res = documento
  } catch (Error) {
    console.error('Error adding document: ', Error)
    res = { error: Error }
  }
  return res
}

async function cargarProyectos(IDusuario) {
  const totalProyects = await getDocs(
    collection(db, 'Usuarios', IDusuario, 'proyectos')
  )
  let proyectos = []
  totalProyects.forEach((doc) => {
    proyectos.push(doc.data())
  })
  return proyectos
}
async function cargarLogs(IDusuario, idProyecto) {
  console.log(IDusuario, idProyecto)
  const estadisticas = await getDocs(
    collection(db, 'Usuarios', IDusuario, 'proyectos', idProyecto, 'estadisticas')
  )
  
  let logs = []
  let totalLogs = []
  estadisticas.forEach(async (doc) => {
      logs = await getDocs(
      collection(db, 'Usuarios', IDusuario, 'proyectos', idProyecto, 'estadisticas', doc.id, 'ubicaciones')
    )
      totalLogs.push(logs)
  })
  console.log(totalLogs);
  return logs
}

async function borrarProyecto(id, IDusuario) {
  try {
    await deleteDoc(doc(db, 'Usuarios', IDusuario, 'proyectos', id + ''))
  } catch (Error) {
    console.error('Error adding document: ', Error)
    return {res: error}
  }
  return {res: 'deleted'}
}



export {
  crearProyecto,
  cargarProyectos,
  borrarProyecto,
  cargarLogs
}

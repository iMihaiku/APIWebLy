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
  where
} from 'firebase/firestore'

async function crearProyecto(id, titulo, descripcion, URLDomain, IDusuario) {
  let res
  console.log(id, titulo, descripcion, IDusuario);
  const documento = {
    title: titulo,
    descprition: descripcion,
    creationDate: new Date(),
    id: id,
    state: 'offline',
    URLDomain: URLDomain,
  }
  try {
    await setDoc(
      doc(db, 'Usuarios', IDusuario, 'proyectos', id + ''),
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
  console.log(IDusuario, idProyecto);
  const totalLogs = await getDocs(
    collection(db, 'Usuarios', IDusuario, 'proyectos', idProyecto, 'logs')
  )
  let logs = []
  totalLogs.forEach((doc) => {
    logs.push(doc.data())
  })
  return logs
}

async function borrarProyecto(id, IDusuario) {
  try {
    await deleteDoc(doc(db, 'Usuarios', IDusuario, 'proyectos', id + ''))
  } catch (Error) {
    console.error('Error adding document: ', Error)
  }
}

export { crearProyecto, cargarProyectos, borrarProyecto, cargarLogs }

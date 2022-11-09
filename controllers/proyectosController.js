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

async function crearProyecto(titulo, descripcion, IDusuario) {
  const totalProyects = await getDocs(
    collection(db, 'Usuarios', IDusuario, 'proyectos')
  )
  let proyectID
  totalProyects.forEach((doc) => {
    proyectID = doc.data().id + 1
  })

  console.log(proyectID + ' ' + IDusuario)
  const documento = {
    titulo: titulo,
    descripcion: descripcion,
    fechaCreacion: new Date(),
    id: proyectID
  }
  try {
    await setDoc(
      doc(db, 'Usuarios', IDusuario, 'proyectos', proyectID + ''),
      documento
    )
  } catch (Error) {
    console.error('Error adding document: ', Error)
  }
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

async function borrarProyecto(id, IDusuario) {
  try {
    await deleteDoc(doc(db, 'Usuarios', IDusuario, 'proyectos', id + ''))
  } catch (Error) {
    console.error('Error adding document: ', Error)
  }
}

export { crearProyecto, cargarProyectos, borrarProyecto }

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
async function validar(idProyecto, IDusuario, ip) {
  const docRef = doc(db, 'Usuarios', IDusuario, 'proyectos', idProyecto + '')
  const docSnap = await getDoc(docRef)
  return { 
    validated: docSnap.exists(),
    ip: ip
  }
}

async function cargarEstadisticas(IDusuario, idProyecto) {
  console.log(IDusuario, idProyecto);
  const estadisticas = await getDocs(
    collection(db, 'Usuarios', IDusuario, 'proyectos', idProyecto+"", 'estadisticas')
  )
  let estadisticasArray = []
  estadisticas.forEach((doc) => {
    estadisticasArray.push(doc.data())
  })
  return estadisticasArray
}
async function agregarEstadisticas(
  idProyecto,
  IDusuario,
  visitas,
  ips,
  eventos
) {
  let res
  const documento = {
    fecha: new Date(),
    visitas: visitas,
    ips: ips,
    eventos: eventos,
  }
  try {
    const ref = await addDoc(
      collection(db, 'Usuarios', IDusuario, 'proyectos', idProyecto + '', 'estadisticas' ), documento)
    res = {status: 'ok'}
  } catch (Error) {
    console.error('Error adding document: ', Error)
    res = { error: Error }
  }
  return res
}

async function crearEstadistica(idProyecto, IDusuario) {
  let res

  const documento = {
    visitas: '10',
    paises: {
      Argentina: 10,
      Chile: 5
    }
  }
  try {
    await addDoc(
      collection(
        db,
        'Usuarios',
        IDusuario,
        'proyectos',
        idProyecto + '',
        'estadisticas'
      ),
      documento
    )
    res = documento
  } catch (Error) {
    console.error('Error adding document: ', Error)
    res = { error: Error }
  }
  return res
}
export {
  cargarEstadisticas,
  crearEstadistica,
  agregarEstadisticas,
  validar
}
import {myApp, db} from '../firebase.js'
import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, setDoc, query, where } from "firebase/firestore"
import jwt from 'jsonwebtoken'

async function crearUsuario(email, hashPass, auth){
  const documento = {email: email, hashpass: hashPass, auth: auth}
  try {
      await setDoc(doc(db, "Usuarios", email), documento)
      const token = jwt.sign({id: email, auth: auth}, process.env.SECRET)
      return {'token': token}
  }
  catch (Error){
    console.error("Error adding document: ", Error)
    return {'error': Error}
  }
}

async function borrarUsuario(id, auth, IDusuario){
  console.log(id + ' ' + auth + ' ' + IDusuario);
  if (!(id===IDusuario || auth==="admin")) return {error: "No tienes permisos para borrar este usuario"}
  try {
      await deleteDoc(doc(db, "Usuarios", id + ""))
  }
  catch (Error){
      console.error("Error deleting document: ", Error)
  }
}

async function loginUsuario(email, hashpass){
  let usuario = {}
  try {
      const q = query(collection(db, "Usuarios"), where("email", "==", email), where("hashpass", "==", hashpass));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usuario = doc.data()
      });
      console.log(usuario);
      if(usuario===undefined || usuario.email===undefined) return {error: "El usuario no existe en nuestra base de datos, por favor, revise sus credenciales"}
      const token = jwt.sign({id: usuario.email, auth: usuario.auth}, process.env.SECRET)
      return {'token': token}
  }
  catch (Error){
      console.error("Error adding document: ", Error)
  }
}

export { crearUsuario, borrarUsuario, loginUsuario }
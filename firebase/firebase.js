import app from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from './config'

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
    }

    //Registrar Usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        });
    }

    //Iniciar sesion 
    async iniciarSesion(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cerrar sesion
    async cerrarSesion() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;
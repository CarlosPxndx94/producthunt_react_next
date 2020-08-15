import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'

const useProducto = (order, type = 'desc') => {

    const [productos, setProductos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getProductos = async () => {
            await firebase.db.collection('productos').orderBy(order, type).onSnapshot(manejarSnapshot);
        }

        getProductos();
    }, []);

    function manejarSnapshot(snapshot) {
        const result = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setProductos(result);
    }

    return {
        productos
    }
}

export default useProducto;
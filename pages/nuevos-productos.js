import React, { useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import FileUploader from "react-firebase-file-uploader";
import Layout from '../components/layout/Layout'
import {
  Formulario,
  Campo,
  InputSubmit,
  H1Form,
  Error
} from '../components/ui/Formulario'

import { FirebaseContext } from '../firebase'

//validaciones hook
import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  url_imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevosProductos() {

  //State para la image
  const [nombreImagen, setNombreImagen] = useState('');
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [progresoImagen, setProgresoImagen] = useState(0);
  const [urlImagen, setUrlImagen] = useState('');

  const [error, setError] = useState(false);

  const {
    values,
    errores,
    handleChange,
    handleSubmit
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, url_imagen, url, descripcion } = values;

  //hook router para redireccionar
  const router = useRouter();

  //context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  //handle de crear cuenta
  async function crearProducto() {

    if (!usuario) {
      return router.push('/login');
    }

    const producto = {
      nombre,
      empresa,
      urlImagen,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now()
    }
    try {

      //Insertar en la BD de firestore
      await firebase.db.collection('productos').add(producto);

      router.push("/");
    } catch (error) {
      console.error('Error creando el usuario', error.message);
      setError(error.message);
    }
  }

  const handleUploadStart = () => {
    setProgresoImagen(0);
    setSubiendoImagen(true);
  }

  const handleProgress = progeso => {
    setProgresoImagen(progeso);
  }

  const handleUploadError = error => {
    setSubiendoImagen(error);
    console.error(error);
  }

  const handleUploadSuccess = nombreImagen => {
    setProgresoImagen(100);
    setSubiendoImagen(false);
    setNombreImagen(nombreImagen);

    firebase
      .storage
      .ref("productos")
      .child(nombreImagen)
      .getDownloadURL()
      .then(url => {
        console.log(url);

        setUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        <>
          <H1Form>Nuevo Producto</H1Form>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>
                Información General
              </legend>

              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Tu Nombre"
                  value={nombre}
                  onChange={handleChange}
                />
              </Campo>

              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  id="empresa"
                  placeholder="Tu Empresa"
                  value={empresa}
                  onChange={handleChange}
                />
              </Campo>

              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                  accept="img/*"
                  name="imagen"
                  id="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="Url del producto"
                  value={url}
                  onChange={handleChange}
                />
              </Campo>

              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>
                Sobre tu producto
              </legend>

              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                />
              </Campo>

              {errores.descripcion && <Error>{errores.descripcion}</Error>}

            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit
              type="submit"
              value="Crear Producto"
            />

          </Formulario>
        </>
      </Layout>
    </div>
  )
}
import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import {
  Formulario,
  Campo,
  InputSubmit,
  H1Form,
  Error
} from '../components/ui/Formulario'

import firebase from '../firebase'

//validaciones hook
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

export default function CrearCuenta() {

  const [error, setError] = useState(false);

  const {
    values,
    errores,
    handleChange,
    handleSubmit
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = values;

  //handle de crear cuenta
  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push("/");
    } catch (error) {
      console.error('Error creando el usuario', error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <H1Form>Crear Cuenta</H1Form>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu E-mail"
                value={email}
                onChange={handleChange}
              />
            </Campo>

            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
                value={password}
                onChange={handleChange}
              />
            </Campo>

            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit
              type="submit"
              value="Crear Cuenta"
            />

          </Formulario>
        </>
      </Layout>
    </div>
  )
}
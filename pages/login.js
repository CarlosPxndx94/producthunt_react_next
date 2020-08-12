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
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const STATE_INICIAL = {  
  email: '',
  password: ''
}
export default function Login() {

  const [error, setError] = useState(false);

  const {
    values,
    errores,
    handleChange,
    handleSubmit
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = values;

  //handle de crear cuenta
  async function iniciarSesion() {
    try {
      await firebase.iniciarSesion(email, password);
      Router.push("/");
    } catch (error) {
      console.error('Error iniciacndo sesion', error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <H1Form>Iniciar Sesión</H1Form>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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
              value="Iniciar Sesión"
            />

          </Formulario>
        </>
      </Layout>
    </div>
  )
}
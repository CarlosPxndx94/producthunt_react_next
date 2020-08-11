import React from 'react'
import Layout from '../components/layout/Layout'
import {
  Formulario,
  Campo,
  InputSubmit,
  H1Form
} from '../components/ui/Formulario'

//validaciones hook
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

export default function CrearCuenta() {

  const {
    values,
    errores,
    submitForm,
    handleChange,
    handleSubmit
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  //handle de crear cuenta
  function crearCuenta() {
    console.log("Creando Cuenta");
  }

  return (
    <div>
      <Layout>
        <>
          <H1Form>Crear Cuenta</H1Form>
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu Nombre"
              />
            </Campo>

            <Campo>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Tu E-mail"
              />
            </Campo>

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu Password"
              />
            </Campo>

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
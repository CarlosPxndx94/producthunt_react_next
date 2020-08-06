import React from 'react'
import Buscador from '../ui/Buscador'
import Navegacion from './Navegacion'
import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Buscador />

                    <Navegacion />
                </div>

                <div>
                    <p>Hola: Carlos</p>
                    <button type="button">Cerrar Sesión</button>

                    <Link href="/"><a>Login</a></Link>
                    <Link href="/"><a>Crear Cuenta</a></Link>
                </div>
            </div>
        </header>
    );
}
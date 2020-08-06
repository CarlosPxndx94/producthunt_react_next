import React from 'react'
import Link from 'next/link'

export default function Navegacion() {
    return (
        <nav>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/"><a>Populares</a></Link>
            <Link href="/"><a>Nuevos Productos</a></Link>
        </nav>
    );
}
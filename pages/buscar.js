import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import DetalleProducto from '../components/layout/DetalleProducto'

//hook de productos
import useProductos from '../hooks/useProductos'

export default function Buscar() {

  const router = useRouter();
  const { query: { q } } = router;

  const { productos } = useProductos('creado');
  const [resultado, setResultado] = useState([]);


  useEffect(() => {
    const busqueda = q.toLowerCase();
    const productosFiltro = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    });

    setResultado(productosFiltro);
  }, [q, productos])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                resultado.map(producto => (
                  <DetalleProducto
                    key={producto.id}
                    producto={producto}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

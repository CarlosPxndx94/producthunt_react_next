import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Router from 'next/router'

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSumbit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: #FFFFFF;
    border: none;
    text-indent: -9999px;

    &:hover{
        cursor: pointer;
    }
`;

export default function Buscador() {

    //useState
    const [busqueda, setBusqueda] = useState('');

    //Funcion para buscar
    const handleFormBuscar = e => {
        e.preventDefault();

        if (busqueda.trim() === '') return;

        //redirecionar al usuario
        Router.push({
            pathname: '/buscar',
            query: { q: busqueda }
        })
    }

    return (
        <form
            css={css`
                    position: relative;
                `}
            onSubmit={handleFormBuscar}
        >
            <InputText
                type="text"
                placeholder="Buscar Producto"
                onChange={e => setBusqueda(e.target.value)}
            />
            <InputSumbit type="submit">
                Buscar
            </InputSumbit>
        </form>
    );
}
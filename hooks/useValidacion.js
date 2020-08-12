import React, { useState, useEffect } from 'react'

const useValidacion = (stateInicial, validar, fn) => {

    const [values, setValues] = useState(stateInicial);
    const [errores, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errores).length === 0;

            if (noErrors) {
                fn(); //fn => Funcion que se ejecuta en el componente
            }

            setSubmitForm(false);
        }
    }, [errores]);

    //Funcion que se ejecuta mientras el usuario escribe.
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    //Funcion que se ejcuta cuando se hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(values);
        setErrors(erroresValidacion);
        setSubmitForm(true);
    }

    return {
        values,
        errores,
        handleChange,
        handleSubmit
    }
}

export default useValidacion;
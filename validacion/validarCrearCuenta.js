export default function validarCrearCuenta(valores) {
    let errores = {}

    //Validar nombre
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    }

    //Validar Email
    if (!valores.email) {
        errores.email = 'El email es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/.test(valores.email)) {
        errores.email = 'El email no es válido';
    }

    //Validar password
    if (!valores.password) {
        errores.password = 'El password es obligatorio';
    } else if (valores.password.length < 6) {
        errores.password = 'El password debe er de mínimo 6 carácteres';
    }

    return errores;
}
export default function validarCrearCuenta(valores) {
    let errores = {}

    //Validar nombre
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    }

    //Validar empresa
    if (!valores.empresa) {
        errores.empresa = 'La empresa es obligatoria';
    }

    //Validar imagen
    if (!valores.empresa) {
        errores.empresa = 'La empresa es obligatoria';
    }

    //Validar url
    if (!valores.url) {
        errores.url = 'La url es obligatoria';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'La url no es correcta';
    }

    //Validar decripcion
    if (!valores.descripcion) {
        errores.descripcion = 'La descripción es obligatoria';
    }

    return errores;
}
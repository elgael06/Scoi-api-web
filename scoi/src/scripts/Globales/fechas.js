

const fecha_hoy_yyyy_mm_dd = () => {
    const f = new Date();
    const dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
    const mes = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : "0" + (f.getMonth() + 1);
    const anio = f.getFullYear();

    return `${anio}-${mes}-${dia}`;
}

const parseo_fecha= fecha => {
    let f = fecha.split("-") ;
    return f.length == 3 ? f[2] + "-" + f[1] + "-" + f[0] : fecha_hoy();
}

const fecha_hoy_dd_mm_yyyy= () => {
    const f = new Date();
    const dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
    const mes = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : "0" + (f.getMonth() + 1);
    const anio = f.getFullYear();

    return dia + "/" + mes + "/" + anio;
}

export {
    fecha_hoy_yyyy_mm_dd,
    parseo_fecha,
    fecha_hoy_dd_mm_yyyy
}
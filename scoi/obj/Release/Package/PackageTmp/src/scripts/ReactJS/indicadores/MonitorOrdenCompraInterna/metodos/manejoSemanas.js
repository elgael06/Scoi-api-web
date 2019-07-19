
const obtener_semanas_ocupadas_por_anio = lista => {
    const lista_meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    lista.sort((a, b) => (a.Anio > b.Anio ? 1 : -1));
    lista.sort((a, b) => (a.Semana_anio > b.Semana_anio ? 1 : -1));
    let lista_anios = [];
    lista.forEach(anio => {
        if (lista_anios.findIndex(e => e.anio === anio.Anio) === -1) {
            let num_semana = semanas_obtenidas(
                lista.filter(e => e.Anio === anio.Anio)
            );
            num_semana.sort((a, b) => lista_meses.findIndex(e => e == a.Mes) > lista_meses.findIndex(e => e == b.Mes)? 1: -1);
            lista_anios.push({
                anio: anio.Anio,
                meses: obtener_semanas_por_mes(num_semana),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_anios;
};
const semanas_obtenidas = semanas => {
    let num_semana = [];
    semanas.forEach(sem => {
        if (
            num_semana.findIndex(
                e => e.Semana_anio === sem.Semana_anio && e.Mes === sem.Mes
            ) === -1
        ) {
            num_semana.push({
                Mes: sem.Mes,
                Semana_anio: sem.Semana_anio,
                Total: sem
            });
        }
    });
    return num_semana;
};
const obtener_semanas_por_mes = lista => {
    let lista_meses = [];
    lista.forEach(mes => {
        if (lista_meses.findIndex(e => e.mes === mes.Mes) === -1) {
            let num_semana = semanas_obtenidas(lista.filter(e => e.Mes === mes.Mes));
            num_semana.sort((a, b) => (a.Anio > b.Anio ? 1 : -1));
            lista_meses.push({
                mes: mes.Mes,
                semanas: num_semana,
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_meses;
};

export {
    obtener_semanas_ocupadas_por_anio,
    semanas_obtenidas,
    obtener_semanas_por_mes
}
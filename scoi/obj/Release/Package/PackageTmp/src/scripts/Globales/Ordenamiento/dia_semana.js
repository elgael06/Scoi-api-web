
const dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

export default function dia_semana(lista) {
    return lista.filter(e => e != "").sort(
        (a, b) => dias.findIndex(e => e == a.clasificador.toUpperCase())
            > dias.findIndex(e => e == b.clasificador.toUpperCase())
            ? 1 : -1);
};
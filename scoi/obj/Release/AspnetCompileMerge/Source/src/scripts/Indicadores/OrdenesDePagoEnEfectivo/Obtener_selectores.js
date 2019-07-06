let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/"

const Ocultar_mostrar_Selector_rotacion = name => {
    const filtro = function () {
        let select = null;
        for (let e of document.querySelectorAll(".rotate")) {
            !(e.attributes.name) || function () { select = e.attributes.name.nodeValue === name ? e : select }();
        }
        return select;}();
  return filtro === null || function () { filtro.style.display = filtro.style.display === "none" ? "" :"none"; }();
}
//Conexiones
const Obtener_combo_cuentas = () => {
    fetch(`${$URL_MVC}Combos?tipo=Cuentas_Reporte_Banco_Interno`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error("Error=>",err))
        .then(res => res.json().then(lista => agregar_tipo_cuenta(lista)))
}
const Obtener_combos_conceptos_orden = () => {
    fetch(`${$URL_MVC}/Conceptos_de_orden_de_pago`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error("Error=>", err))
        .then(res => res.json().then(lista => agregar_tipo_concepto_orden(lista)))
}
//metodos
const agregar_tipo_cuenta = (lista) => {
    Ocultar_mostrar_Selector_rotacion("tipo");
    let select = document.querySelector("#lista_cuentas");
    lista.forEach(e => {
        const opt = document.createElement("option");
        const text = document.createTextNode(e);
        opt.value=e;
        opt.appendChild(text);
        select.appendChild(opt);
    });
    select.disabled = false;
}
const agregar_tipo_concepto_orden = (lista) => {
    Ocultar_mostrar_Selector_rotacion("orden");
    let select = document.querySelector("#orden_pago");
    lista.forEach(e => {
        const opt = document.createElement("option");
        const text = document.createTextNode(e);
        opt.value = e;
        opt.appendChild(text);
        select.appendChild(opt);
    });
    select.disabled = false;
}
//eventos
window.addEventListener("load", () => {
    Obtener_combo_cuentas();
    Obtener_combos_conceptos_orden();
});


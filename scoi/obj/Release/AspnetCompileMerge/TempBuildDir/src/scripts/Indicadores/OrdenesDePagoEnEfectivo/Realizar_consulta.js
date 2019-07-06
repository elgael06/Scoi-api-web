//variables
const fecha1                = document.querySelector("#f1"); 
const fecha2                = document.querySelector("#f2"); 
const lista_cuentas         = document.querySelector("#lista_cuentas"); 
const lista_conceptos       = document.querySelector("#lista_conceptos"); 
const tipo_beneficiario     = document.querySelector("#tipo_beneficiario"); 
const orden_pago            = document.querySelector("#orden_pago"); 
const nombre_beneficiario   = document.querySelector("#nombre_beneficiario"); 
const btn_consultar         = document.querySelector("#btn_consultar");

//Conexiones
const Enviar_consulta_Monitor = filtro => {
    vista_pagos_por_semana.eliminar_todo();
    document.querySelector("#modal_de_efecto_carga").style.display = "flex";
    console.log("Enviar=>", filtro);
    fetch(`${$URL_API}Obtener_ordenes_pago_en_efectivo`, {
        method: 'post',
        credentials: 'same-origin',
        body: JSON.stringify(filtro),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error("Error=>", err))
        .then(res => res.json().then(lista => respuesta_consulta(lista)))
}
//metodos
const verificar_Campos = () => {
    const parametros_seleccion = {
        f1                      : pase_fecha(fecha1.value),
        f2                      : pase_fecha(fecha2.value),
        cuenta                  : lista_cuentas.value,
        concepto_compra_o_gasto : lista_conceptos.value,
        tipo_beneficiario       : tipo_beneficiario.value,
        concepto_orden_pago     : orden_pago.value,
        beneficiario            : nombre_beneficiario.children[0].attributes.name.nodeValue
    }

    return parametros_seleccion.f1 != "" && parametros_seleccion.f2 != "" && parametros_seleccion.beneficiario != "0" ? Enviar_consulta_Monitor(parametros_seleccion) : alert("Faltan Parametros..."); 
}
const pase_fecha = fecha => {
    let f = fecha.split("-");
    return `${f[2]}/${f[1]}/${f[0]}`
}
const respuesta_consulta = lista => {
    llenar_tabla_pagos(lista);
    document.querySelector("#modal_de_efecto_carga").style.display = "none";
}
window.addEventListener("load", () => {
    btn_consultar.addEventListener("click", () => {
        verificar_Campos() 
    });
});

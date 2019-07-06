
//variables
let $URL_API = "/api/";
let btn_buscar_Beneficiario                 = document.querySelector("#btn_buscar_Beneficiario");
let caja_filtro_beneficiario                = document.querySelector("#caja_filtro_beneficiario");
let btn_cerrar_modal_beneficiarios          = document.querySelector("#btn_cerrar_modal_beneficiarios");
let btn_cerrar_modal_beneficiarios_pie      = document.querySelector("#btn_cerrar_modal_beneficiarios_pie");
let btn_seleccionar_modal_beneficiarios_pie = document.querySelector("#btn_seleccionar_modal_beneficiarios_pie");
//Objetos
const Parametros = {}

//conexiones
const Obtener_beneficiarios_por_tipo = (tipo) => {
    fetch(`${$URL_API}Obtener_beneficiarios?tipo=${tipo}`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error("Error=>", err))
        .then(res => res.json().then(lista => llenar_tabla_proveedores(lista)))
}
//metodos
const abrir_modal = () => {
    let beneficiarios = document.querySelector("#tipo_beneficiario");
    Obtener_beneficiarios_por_tipo(beneficiarios.value || 0);
    document.querySelector("#modal_de_efecto_carga").style.display="flex";
}
const cerrar_modal_beneficiarios = () => {
    document.querySelector("#modal_seleccion_beneficiarios").style.display = "none";
    Parametros["beneficiario"] = {};
}
const llenar_tabla_proveedores = (lista) => {
    document.querySelector("#modal_de_efecto_carga").style.display = "none";
    document.querySelector("#modal_seleccion_beneficiarios").style.display = "flex";
    renderizar_beneficiarios_en_tabla(lista);

}
const renderizar_beneficiarios_en_tabla = selecciones => {
    let contenedor = document.querySelector("#listado_beneficiarios");
    let lista_seleccion = document.querySelectorAll(".datos_lista_beneficiario");
    let datos = "";
    lista_seleccion.forEach(e => e.remove());

    for (let sel of selecciones) {
        datos += `<tr class="datos_lista_beneficiario" onclick="marcar_beneficiario_en_lista(${sel.Folio} ,'${sel.Nombre}')" name="${sel.Folio + " " + sel.Nombre}">
            <td >${sel.Folio}</td>
            <td>${sel.Nombre} <i class="btn btn-default fa fa-circle-o btn_seleccion"></i></td>
        </tr>`;
    }
    contenedor.innerHTML = datos;
}
const filtrar_tabla_beneficiarios = (filtro) => {
    let lista_seleccion = document.querySelectorAll(".datos_lista_beneficiario");
    lista_seleccion.forEach(e => {
        let text = e.attributes.name.nodeValue;
        e.style.display = verificar_coincidencias(filtro, text) ? "" : "none";
    });
}
const verificar_coincidencias = (filtro ,texto) => {
    let array_texto = texto.split(" ");
    let array_filtro = filtro.split(" ");
    let res = [];
    array_filtro.forEach(f => {
        res = res.concat(array_texto.filter(e => e.toUpperCase().search(f) > -1));
    });
    return array_filtro.length > 1 ? res.length > 1 : res.length > 0  ;
}
const marcar_beneficiario_en_lista = (Folio, Nombre) => {
    let lista_seleccion = document.querySelectorAll(".datos_lista_beneficiario");
    
    document.querySelectorAll(".btn_seleccion").forEach(e => {
        e.className = "btn btn-default fa fa-circle-o btn_seleccion";
    });

    lista_seleccion.forEach(e => {
        !(`${Folio + " " + Nombre}` === e.attributes.name.nodeValue) || function () {
            let btn = e.children[1].children[0];
            btn.className = btn.className == "btn btn-info fa fa-check-circle-o btn_seleccion"
                ? "btn btn-default fa fa-circle-o btn_seleccion" : "btn btn-info fa fa-check-circle-o btn_seleccion";
            }();
    });
    Parametros["beneficiario"] = {
        Folio: Folio,
        Nombre: Nombre
    }
}
const seleccionar_beneficiarios_modal = () => {
    console.log("Seleccionado.", Parametros["beneficiario"]);

    let sel = document.querySelector("#nombre_beneficiario");
    if (Parametros["beneficiario"]["Nombre"]) {
        sel.innerHTML = `<p name="${Parametros["beneficiario"]["Folio"]}"> ${Parametros["beneficiario"]["Nombre"]}</p>`;

        document.querySelector("#modal_seleccion_beneficiarios").style.display = "none";
    } else alert("No Seleccionado!!!");
}
//eventos
window.addEventListener("load", () => {
    btn_buscar_Beneficiario.addEventListener("click", abrir_modal);
    btn_cerrar_modal_beneficiarios.addEventListener("click", cerrar_modal_beneficiarios);
    btn_cerrar_modal_beneficiarios_pie.addEventListener("click", cerrar_modal_beneficiarios);
    btn_seleccionar_modal_beneficiarios_pie.addEventListener("click", seleccionar_beneficiarios_modal);
    caja_filtro_beneficiario.addEventListener("keyup", (e) => filtrar_tabla_beneficiarios(e.target.value.toUpperCase()));
});
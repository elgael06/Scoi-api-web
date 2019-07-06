
const mostrar_mensaje = (texto, clase) => {
    let alerta = document.querySelector("#mensaje_alerta");
    let area_texto = document.querySelector("#texto_alerta");
    clase = clase ? clase : "alert-info";

    alerta.classList.add(clase);

    alerta.style.display = "flex";
    area_texto.textContent = texto;

    setTimeout(() => quirtar_alerta(alerta), 3000);

}

const quirtar_alerta = (alerta) => {
    let classes = ["alert-success", "alert-info", "alert-warning", "alert-danger"];
    for (let c of classes) {
        alerta.classList.remove(c)
    };
    alerta.style.display = "none";

}
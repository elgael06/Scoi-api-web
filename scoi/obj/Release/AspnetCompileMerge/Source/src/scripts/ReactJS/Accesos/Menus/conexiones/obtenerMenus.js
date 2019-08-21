

const accesos_url = llenar => {
    const { id } = USUARIO;

    const xhttp = new XMLHttpRequest();
    let respuesta = [];
    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            respuesta = this.responseText;
            respuesta = JSON.parse(respuesta);
            respuesta.length > 0 ? llenar(respuesta) : setTimeout(() => mostrar_mensaje("Sin Acceso A Aplicaciones...", "alert-warning"), 2000);
            console.log("respuesta=>", respuesta);
        }
        else if (this.status > 200) {
            mostrar_mensaje(`Error: ${this.status}`, "alert-danger");
        }
    };

    xhttp.open("get", `/api/Accesos_url?id=${id}`, false);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();
}

export default accesos_url;
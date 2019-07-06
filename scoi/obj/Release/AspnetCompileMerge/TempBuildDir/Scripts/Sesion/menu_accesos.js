

const menu_aplicaciones = new Vue({
    el: "#menu_aplicaciones",
    Data: {
        menu:"Aplicaciones",
        ListaAcceso:[]
    },
    created: function () {
        this.ListaAcceso = peticion();
    }
});

function peticion() {
    let respuesta = [];
    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            respuesta = this.responseText;
            respuesta = JSON.parse(respuesta);
            //respuesta.length > 0 ?  : setTimeout(() => mostrar_mensaje("Sin Acceso A Aplicaciones...", "alert-warning"), 2000);
        }
        else if (this.status > 200) {
            mostrar_mensaje(`Error: ${this.status}`, "alert-danger");
        }
    };
    xhttp.open("get", `/api/Accesos_url?id=${id}`, false);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();

    return respuesta;
}
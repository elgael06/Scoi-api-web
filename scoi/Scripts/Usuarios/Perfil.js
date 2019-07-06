//variables Globales
var btn_perfil_usuario = document.querySelector("#btn_perfil_usuario");
var modal_perfil_usuario = document.querySelector("#modal_perfil_usuario");
var cerrar_modal_perfil_usuario = document.querySelector("#cerrar_modal_perfil_usuario");
var password_actual = document.querySelector("#password_actual");
var password_nuevo = document.querySelector("#password_nuevo");
var password_nuevo_confirmar = document.querySelector("#password_nuevo_confirmar");
//funciones
var cambiar_estado_nuevo_password = function (estado) {
    password_nuevo.disabled = estado;
    password_nuevo.value = estado ? '' : password_nuevo.value;
    !estado || cambiar_password_nuevo_confirmar(estado);
};
var cambiar_password_nuevo_confirmar = function (estado) {
    password_nuevo_confirmar.disabled = estado;
    password_nuevo_confirmar.value = estado ? '' : password_nuevo_confirmar.value;
};
var confirmar_password_nuevo = function (pass, pass2) {
    password_nuevo_confirmar.style.border = "solid 3px red";
    setTimeout(function () {
        password_nuevo_confirmar.value = '';
        password_nuevo_confirmar.style.border = "";
    }, 2000);
    return pass === pass2;
};
var enviar_cambio_contrasenia = function (id) {
    var oldPass = password_actual.value, newPass = password_nuevo.value, newPass2 = password_nuevo_confirmar.value;
    !confirmar_password_nuevo(newPass, newPass2) ||
        fetch("/Usuarios/CambioPassword?id=" + id + "&oldPass=" + oldPass + "&newPass=" + newPass, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (r) { return r.json().then(function (res) { return res == "OK" ? location.href = "/login" : alert("Error en Password!!!"); }); })
            .catch(function (err) { return alert("Error Cambio!!!"); });
};
var cancelar = function () {
    password_actual.value = "";
    cambiar_estado_nuevo_password(true);
    modal_perfil_usuario.style.display = "none";
};
//Eventos
btn_perfil_usuario.addEventListener("click", function () {
    modal_perfil_usuario.style.display = "flex";
});
cerrar_modal_perfil_usuario.addEventListener("click", function () {
    modal_perfil_usuario.style.display = "none";
});
password_actual.addEventListener("change", function () {
    var pass = password_actual.value;
    cambiar_estado_nuevo_password(!(pass.length > 0));
});
password_nuevo.addEventListener("change", function () {
    var pass = password_nuevo.value;
    cambiar_password_nuevo_confirmar(!(pass.length > 0));
});
//# sourceMappingURL=Perfil.js.map
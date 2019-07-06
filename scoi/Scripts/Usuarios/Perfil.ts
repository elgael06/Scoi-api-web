
//variables Globales
let btn_perfil_usuario = document.querySelector("#btn_perfil_usuario");
let modal_perfil_usuario:any = document.querySelector("#modal_perfil_usuario");
let cerrar_modal_perfil_usuario: any = document.querySelector("#cerrar_modal_perfil_usuario");

let password_actual: any = document.querySelector("#password_actual");
let password_nuevo: any = document.querySelector("#password_nuevo");
let password_nuevo_confirmar: any = document.querySelector("#password_nuevo_confirmar");

//funciones
const cambiar_estado_nuevo_password = (estado: boolean) => {
    password_nuevo.disabled = estado;
    password_nuevo.value = estado ? '' : password_nuevo.value;

    !estado || cambiar_password_nuevo_confirmar(estado);
}
const cambiar_password_nuevo_confirmar = (estado: boolean) => {
    password_nuevo_confirmar.disabled = estado;
    password_nuevo_confirmar.value = estado ? '' : password_nuevo_confirmar.value;
}
const confirmar_password_nuevo = (pass: string, pass2: string) => {
    password_nuevo_confirmar.style.border = "solid 3px red";
    setTimeout(() => {
        password_nuevo_confirmar.value =  '';
        password_nuevo_confirmar.style.border = "";
    }, 2000);
    return pass === pass2;
}
const enviar_cambio_contrasenia = (id: string) => {
    let oldPass: string = password_actual.value,
        newPass: string = password_nuevo.value,
        newPass2: string = password_nuevo_confirmar.value ;

    !confirmar_password_nuevo(newPass, newPass2) ||
    fetch(`/Usuarios/CambioPassword?id=${id}&oldPass=${oldPass}&newPass=${newPass}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json().then(res => res =="OK" ?location.href ="/login":alert("Error en Password!!!")))
        .catch(err=>alert("Error Cambio!!!"));
}
const cancelar = () => {
    password_actual.value = "";
    cambiar_estado_nuevo_password(true);
    modal_perfil_usuario.style.display = "none";
}
//Eventos
btn_perfil_usuario.addEventListener("click", () => {
    modal_perfil_usuario.style.display = "flex";
});
cerrar_modal_perfil_usuario.addEventListener("click", () => {
    modal_perfil_usuario.style.display = "none";
});

password_actual.addEventListener("change", () => {
    let pass:string = password_actual.value;
    cambiar_estado_nuevo_password(!(pass.length >0));
});
password_nuevo.addEventListener("change", () => {
    let pass: string = password_nuevo.value;
    cambiar_password_nuevo_confirmar(!(pass.length > 0));
});
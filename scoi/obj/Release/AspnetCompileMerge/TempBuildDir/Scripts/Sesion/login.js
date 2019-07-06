
const checar_usuario = (Nombre,password)=>{
    fetch(`login?nombre=${Nombre}&pasword=${password}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(j => j.json().then(res => {

            res == "OK" ? function(){
                mostrar_mensaje("BIenvenido...", "alert-success");
                setTimeout(() => window.location.href = "/", 300);
            }()
                : mostrar_mensaje("Usuario o Contraseña incorrectos...", "alert-danger");
        }))
        .catch(err => console.log("Error...", err));
}

document.querySelector("#formulario").addEventListener("click", e => {
    let Nombre = document.querySelector("#nombre").value;
    let password = document.querySelector("#passw").value;

    Nombre != "" ? password != "" ? checar_usuario(Nombre, password) : mostrar_mensaje("Falta Colocar Pasword!!!", "alert-warning") : mostrar_mensaje("Falta Colocar Nombre!!!", "alert-warning");

    e.preventDefault();
});

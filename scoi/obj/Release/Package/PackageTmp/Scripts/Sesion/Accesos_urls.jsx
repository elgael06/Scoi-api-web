
const AppAccesos = ({ lista }) => {
    return (<div className="menu_section">
        <h3>Aplicaciones</h3>
        {lista.map(e => (<MenuAcceso menu={e} />))}
    </div>);
}

const MenuAcceso = ({ menu }) => {
    const { Menu, Icon_Menu, Sub_menus } = menu;
    return (<ul className="nav side-menu" style={{fontSize:"11px"}}>
        <li>
            <a><i class={Icon_Menu}></i>
                <strong>{Menu}</strong>
                <span className="fa fa-chevron-down"></span>
            </a>
            {
                Sub_menus.map(e => <SubMenuAcceso subMenu={e} />)
            }
        </li>
    </ul>);
}
const SubMenuAcceso = ({ subMenu }) => {
    const { Sub_menus, Icon_Sub_menus, Accesos } = subMenu;
    return (<ul className="nav child_menu">
        <li>
            <a>
                <i className={Icon_Sub_menus}></i>
                <label> {Sub_menus}</label>
                <span className="fa fa-chevron-down"></span>
            </a>
            <ul className="nav child_menu">
                {
                    Accesos.map(e => <li> <a href={`/${e.Url}`}>{e.Nombre}</a></li>)
                }
            </ul>
        </li>
    </ul>);
}


function ObtenerAccesos(llenar) {
    const { id } = USUARIO;

    const xhttp = new XMLHttpRequest();
    let respuesta = [];
    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            respuesta = this.responseText;
            respuesta = JSON.parse(respuesta);
            respuesta.length > 0 ? llenar(respuesta) : setTimeout(() => mostrar_mensaje("Sin Acceso A Aplicaciones...", "alert-warning"), 2000);
        }
        else if (this.status > 200) {
            mostrar_mensaje(`Error: ${this.status}`, "alert-danger");
        }
    };

    xhttp.open("get", `/api/Accesos_url?id=${id}`, false);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();
}

ObtenerAccesos(lista => {
    ReactDOM.render(
        <AppAccesos
            lista={lista}
        />
        , document.querySelector("#menu_aplicaciones"))
});
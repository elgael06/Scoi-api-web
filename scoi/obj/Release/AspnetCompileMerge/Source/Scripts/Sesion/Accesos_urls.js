"use strict";

var AppAccesos = function AppAccesos(_ref) {
    var lista = _ref.lista;

    return React.createElement(
        "div",
        { className: "menu_section" },
        React.createElement(
            "h3",
            null,
            "Aplicaciones"
        ),
        lista.map(function (e) {
            return React.createElement(MenuAcceso, { menu: e });
        })
    );
};

var MenuAcceso = function MenuAcceso(_ref2) {
    var menu = _ref2.menu;
    var Menu = menu.Menu;
    var Icon_Menu = menu.Icon_Menu;
    var Sub_menus = menu.Sub_menus;

    return React.createElement(
        "ul",
        { className: "nav side-menu", style: { fontSize: "11px" } },
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                null,
                React.createElement("i", { "class": Icon_Menu }),
                React.createElement(
                    "strong",
                    null,
                    Menu
                ),
                React.createElement("span", { className: "fa fa-chevron-down" })
            ),
            Sub_menus.map(function (e) {
                return React.createElement(SubMenuAcceso, { subMenu: e });
            })
        )
    );
};
var SubMenuAcceso = function SubMenuAcceso(_ref3) {
    var subMenu = _ref3.subMenu;
    var Sub_menus = subMenu.Sub_menus;
    var Icon_Sub_menus = subMenu.Icon_Sub_menus;
    var Accesos = subMenu.Accesos;

    return React.createElement(
        "ul",
        { className: "nav child_menu" },
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                null,
                React.createElement("i", { className: Icon_Sub_menus }),
                React.createElement(
                    "label",
                    null,
                    " ",
                    Sub_menus
                ),
                React.createElement("span", { className: "fa fa-chevron-down" })
            ),
            React.createElement(
                "ul",
                { className: "nav child_menu" },
                Accesos.map(function (e) {
                    return React.createElement(
                        "li",
                        null,
                        " ",
                        React.createElement(
                            "a",
                            { href: "/" + e.Url },
                            e.Nombre
                        )
                    );
                })
            )
        )
    );
};

function ObtenerAccesos(llenar) {
    var _USUARIO = USUARIO;
    var id = _USUARIO.id;

    var xhttp = new XMLHttpRequest();
    var respuesta = [];
    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            respuesta = this.responseText;
            respuesta = JSON.parse(respuesta);
            respuesta.length > 0 ? llenar(respuesta) : setTimeout(function () {
                return mostrar_mensaje("Sin Acceso A Aplicaciones...", "alert-warning");
            }, 2000);
        } else if (this.status > 200) {
            mostrar_mensaje("Error: " + this.status, "alert-danger");
        }
    };

    xhttp.open("get", "/api/Accesos_url?id=" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();
}

ObtenerAccesos(function (lista) {
    ReactDOM.render(React.createElement(AppAccesos, {
        lista: lista
    }), document.querySelector("#menu_aplicaciones"));
});


"use strict";

var EfectoCargar = function EfectoCargar(_ref) {
    var estatus = _ref.estatus;

    var visible = estatus == 1 ? "flex" : "none";
    return React.createElement(
        "div",
        { id: "pantalla_carga",
            style: {
                display: visible,
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(242, 242, 242, 0.79)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                fontSize: "40px"
            } },
        React.createElement(
            "label",
            { id: "pantalla_carga1" },
            React.createElement("i", { className: "fa fa-spinner rotate" }),
            React.createElement(
                "strong",
                { style: { fontSize: "20px" } },
                " Cargando..."
            ),
            React.createElement("br", null)
        )
    );
};


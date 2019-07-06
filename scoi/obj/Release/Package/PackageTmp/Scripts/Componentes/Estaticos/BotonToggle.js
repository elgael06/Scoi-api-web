

/*Efectos De Toggle */
/*****************************************************************/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BotonTogle = (function (_React$Component) {
    _inherits(BotonTogle, _React$Component);

    function BotonTogle(props) {
        _classCallCheck(this, BotonTogle);

        _get(Object.getPrototypeOf(BotonTogle.prototype), "constructor", this).call(this, props);
        this.state = {
            clase: "glyphicon glyphicon-plus"
        };
        this.change = this.cambio.bind(this);
    }

    /*****************************************************************/
    /*efecto ocultar/mostrar operaciones a detalle establecimiento*/
    /**/
    _createClass(BotonTogle, [{
        key: "cambio",
        value: function cambio() {
            var clase = this.state.clase;
            var _props = this.props;
            var identificador = _props.identificador;
            var poicion = _props.poicion;

            var dato = clase == "glyphicon glyphicon-minus" ? "glyphicon glyphicon-plus" : "glyphicon glyphicon-minus";
            this.setState({ clase: dato });
            ocultarMostrar(identificador, poicion);
        }
    }, {
        key: "render",
        value: function render() {
            var clase = this.state.clase;

            return React.createElement("i", { className: clase,
                onClick: this.change });
        }
    }]);

    return BotonTogle;
})(React.Component);

var ocultarMostrar = function ocultarMostrar(dato, poicion) {
    var array = dato.split(" ");

    var ocultar_hijos = function ocultar_hijos() {
        var todos = document.querySelectorAll("." + array[0] + "_1");
        todos.forEach(function (e) {
            e.style.display = "none";
        });
        return "none";
    };
    var clase_ = document.querySelectorAll("." + array[array.length - 1]);
    clase_.forEach(function (op) {
        var vista = op.style.display;
        op.style.display = vista ? '' : ocultar_hijos();
    });
}; /**/
/**/var remplazar_espacios_por_guion_bajo = function remplazar_espacios_por_guion_bajo(e) {
    var r = "";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var x = _step.value;
            r += x != " " ? x : "_";
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return r;
}; /**/
/**/var crear_identificador = function crear_identificador(clase, sub) {
    return remplazar_espacios_por_guion_bajo(clase) + "_1 " + remplazar_espacios_por_guion_bajo(clase) + "_" + remplazar_espacios_por_guion_bajo(sub);
};
/**/


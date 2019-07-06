var Obtener_Pagos_Realizados_En_Un_Periodo_Por_Cuenta = function () {
    fetch("concepto_orden_de_pago", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (r) { return r.json()
        .then(function (res) { return console.log(res); }); })
        .catch(function (err) { return console.log(err); });
};
//# sourceMappingURL=main.js.map
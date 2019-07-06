


const Obtener_Pagos_Realizados_En_Un_Periodo_Por_Cuenta = () => {
    fetch("concepto_orden_de_pago", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
        (r: any) => r.json()
            .then((res: any) => console.log(res)))
        .catch(err=>console.log(err));
}
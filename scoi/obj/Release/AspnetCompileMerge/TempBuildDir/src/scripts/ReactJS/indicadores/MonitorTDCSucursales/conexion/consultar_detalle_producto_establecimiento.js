import Axios from "axios";


const consultar_detalle_producto_establecimiento = async (producto, establecimiento) => {
    try {
        const respuesta = await Axios.post(`/api/MonitorDetalleProductoEstablecimiento?producto=${producto}&folio_establecimiento=${establecimiento}`);
        if (respuesta.status == 200) {
            return respuesta.data;
        }
    } catch {
        console.log("Fallo Axios...")
        return null;
    }
}

export default consultar_detalle_producto_establecimiento;
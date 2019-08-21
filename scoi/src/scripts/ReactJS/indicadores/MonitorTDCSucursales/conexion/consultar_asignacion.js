import Axios from "../../../../../../node_modules/axios/index";


const consultar_asignacion = async folio => {
    let respuesta = await Axios.get(`/api/AsignacionVenta?folio=${folio}`);
    let { status,data} = respuesta;
    return status === 200 ? data : null;
}

export default consultar_asignacion;
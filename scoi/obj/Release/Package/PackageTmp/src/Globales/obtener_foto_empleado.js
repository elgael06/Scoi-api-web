import Axios from "axios";


const obtener_foto_empleado = async folio => {
    const respuesta = await Axios.get(`/api/Lista_usuarios/?foto=${folio}`);
    if (respuesta.status === 200) {
        return respuesta.data;
    }
    return "";
}

export default obtener_foto_empleado;
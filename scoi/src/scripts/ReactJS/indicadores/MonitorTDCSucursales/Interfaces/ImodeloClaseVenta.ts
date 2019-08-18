import ImonitorVenta from "./ImonitorVenta";
import ImodeloCategoriaVenta from "./ImodeloCategoriaVenta";

export default interface ImodeloClaseVenta extends ImonitorVenta {
    Categorias?: [ImodeloCategoriaVenta];
}
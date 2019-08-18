import ImonitorVenta from "./ImonitorVenta";
import ImodeloFamiliaVenta from "./ImodeloFamiliaVenta";

export default interface ImodeloCategoriaVenta extends ImonitorVenta {
    Familias?: [ImodeloFamiliaVenta];
}
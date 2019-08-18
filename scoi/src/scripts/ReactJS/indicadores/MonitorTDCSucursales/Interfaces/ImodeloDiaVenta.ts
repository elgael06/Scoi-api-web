import ImonitorVenta from "./ImonitorVenta";
import ImodeloClaseVenta from "./ImodeloClaseVenta";


export default interface ImodeloDiaVenta extends ImonitorVenta {
    Clases?: [ImodeloClaseVenta];
}
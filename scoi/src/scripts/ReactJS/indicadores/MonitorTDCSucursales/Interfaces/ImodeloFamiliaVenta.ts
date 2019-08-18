import ImonitorVenta from "./ImonitorVenta";
import ImodeloProductoVenta from "./ImodeloProductoVenta";


export default interface ImodeloFamiliaVenta extends ImonitorVenta {
    Productos?: [ImodeloProductoVenta];
}
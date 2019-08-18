
import ImonitorVenta from './ImonitorVenta';
import ImodeloDiaVenta from './ImodeloDiaVenta';

export default interface IModeloEstablecimientoVenta extends ImonitorVenta {
    codigo_establecimiento: number;
    Dias?: [ImodeloDiaVenta];
}
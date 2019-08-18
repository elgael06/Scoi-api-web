
/**Modelo Base para Datos de Monitor Venta. */

export default interface ImonitorVenta {
    clasificador?:string;
    semanas: [number];
    anio_actual: number;
    anio_anterior: number;
    crecimiento_actual_anterior?:[number];
    crecimiento_actual_semana_pasado?: [number];
    diferencia_actual?: [number];
    diferencia_semana_pasador?: [number];
    piezas_actual?: [number];
    piezas_anterior?: [number];
    piezas_semana_pasado?: [number];
    venta_actual?: [number];
    venta_anterior?: [number];
    venta_semana_pasado?: [number];
    margen_actual?: [number];
    margen_anterior?: [number];
    margen_semana_pasado?: [number];
}
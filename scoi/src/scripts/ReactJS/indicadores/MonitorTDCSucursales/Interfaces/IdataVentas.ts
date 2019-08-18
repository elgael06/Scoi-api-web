import IModeloEstablecimientoVenta from "./IestablecimientoVenta";


/** Interface de respuesta a controlador MonitorVentas**/

export default interface dataVentas {
   respuesta: [IModeloEstablecimientoVenta];
   establecimientos: [string];
   dia_semana: [string];
   semanas: [string];
   fechas: [string];
   tipo_venta: [string];
   marca: [string];
   modelos: [string];
   colores: [string];
   tallas: [string];
   clases: [string];
   categorias: [string];
   familias: [string];
   lineas: [string];
}
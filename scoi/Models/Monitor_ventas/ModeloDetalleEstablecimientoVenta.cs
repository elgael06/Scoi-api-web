using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloDetalleEstablecimientoVenta
    {
        public ModeloDetalleEstablecimientoVenta(string producto , int folio_establecimiento)
        {
            using ( var context = new Entities())
            {
                var lista = context.monitor_de_ventas_detalle_producto_por_establecimiento(producto, folio_establecimiento).ToList();

                if (lista != null)
                {
                    var primeto = lista.First();
                    cajeros = new List<ModeloDetalleCajeroVenta>();

                    establecimiento = primeto.establecimiento;
                    codigo_producto = primeto.cod_prod;
                    descripcion_producto = primeto.descripcion;

                    foreach (ModeloDetalleCajeroVenta cajero in from filtro in lista
                                           let folio = filtro.folio
                                           where cajeros.FindIndex(e => e.folio == folio) == -1
                                           select new ModeloDetalleCajeroVenta(lista.Where(e => e.folio == folio).ToList())
                                           {
                                               folio = filtro.folio,
                                               descripcion = filtro.nombre_cajero
                                           })
                    {
                        cajeros.Add(cajero);
                    }
                }
            }
        }

        public string establecimiento { get; set; }
        public string codigo_producto { get; set; }
        public string descripcion_producto { get; set; }
        public List<ModeloDetalleCajeroVenta> cajeros { get; set; }
    }
    public class ModeloDetalleCajeroVenta
    {
        public ModeloDetalleCajeroVenta(List<monitor_de_ventas_detalle_producto_por_establecimiento_Result> lista)
        {
            asignaciones = new List<ModeloDetalleAsignacionVenta>();
            foreach (var asignacion in lista)
            {
                DateTime fecha = DateTime.Parse(asignacion.fecha_de_venta_actual.ToString());
                //string dd_mm_yy = fecha.ToString("dd/MM/yyyy");
                //string hora = fecha.ToString("hh:mm:ss tt");//string.Format("{0:hh:mm:ss tt}",fecha);

                asignaciones.Add(new ModeloDetalleAsignacionVenta
                {                    
                    asignacion      = asignacion.asignacion_actual,
                    ticket          = asignacion.ticket,
                    venta_piezas    = asignacion.venta_piezas_actual,
                    costo           = asignacion.costo_actual,
                    importe_sin_iva = asignacion.importe_sin_IVA_actual,
                    utilidad_bruta  = asignacion.utilidad_bruta_actual,
                    tipo_venta      = asignacion.tipo_de_venta,
                    cliente         = asignacion.cliente,
                    margen          = asignacion.margen_actual,
                    fecha           = fecha.ToString("dd/MM/yyyy"),
                    hora            = fecha.ToString("hh:mm:ss tt"),
                    dia             = asignacion.dia_semana_actual
                });
            }
        }

        public int? folio { get; set; }
        public string descripcion { get; set; }
        public string foto { set; get; }
        public List<ModeloDetalleAsignacionVenta> asignaciones { get; set; }
    }
    public class ModeloDetalleAsignacionVenta
    {
        public string asignacion { get; set; }
        public string ticket { get; set; }
        public decimal venta_piezas { get; set; }
        public decimal costo { get; set; }
        public decimal importe_sin_iva { get; set; }
        public decimal utilidad_bruta { get; set; }
        public decimal margen { get; set; }
        public string tipo_venta { get; set; }
        public string cliente { get; set; }
        public string fecha { get; set; }
        public string hora { get; set; }
        public string dia { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloTicketAsignacionVenta : ModeloBaseAsignacionVenta
    {
        public ModeloTicketAsignacionVenta(List<monitor_de_ventas> lista) : base(lista)
        {
            ticket = lista.First().ticket;
            productos = new List<ModeloProductoAsignacionVenta>();
            hora = lista.First().fecha_de_venta_actual?.ToString("hh:mm tt");
            foreach (var produc in lista)
            {
                productos.Add(new ModeloProductoAsignacionVenta(produc));
            }
        }
        public string ticket { get; set; }
        public string hora { get; set; }
        public List<ModeloProductoAsignacionVenta> productos { get; set; }
    }

    public class ModeloProductoAsignacionVenta: ModeloBaseAsignacionVenta
    {
        public ModeloProductoAsignacionVenta(monitor_de_ventas dato) :base(dato)
        {
            codigo      = dato.cod_prod;
            descripcion = dato.descripcion;
            tipo        = dato.tipo_de_venta;
            cliente     = dato.cliente;
        }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public string tipo { get; set; }
        public string cliente { get; set; }
    }

    public class ModeloBaseAsignacionVenta 
    {
        public ModeloBaseAsignacionVenta(List<monitor_de_ventas> datos)
        {
            fecha               = datos.First().fecha_de_venta_actual?.ToString("dd/MM/yyyy");
            venta_pz            = datos.Select(e=>e.venta_piezas_actual).Sum();
            importe             = datos.Select(e => e.importe_actual).Sum(); 
            importe_sin_iva     = datos.Select(e => e.importe_sin_IVA_actual).Sum(); 
            costo               = datos.Select(e => e.costo_actual).Sum();
            utilidad            = datos.Select(e => e.utilidad_bruta_actual).Sum();
            margen              = datos.Select(e => e.margen_actual).Sum() / datos.Count;
            importe_descuento   = datos.Select(e => e.importe_descuento_actual).Sum();
        }
        public ModeloBaseAsignacionVenta(monitor_de_ventas dato)
        {
            venta_pz            = dato.venta_piezas_actual;
            importe             = dato.importe_actual;
            importe_sin_iva     = dato.importe_sin_IVA_actual;
            costo               = dato.costo_actual;
            utilidad            = dato.utilidad_bruta_actual;
            margen              = dato.margen_actual;
            importe_descuento   = dato.importe_descuento_actual;
            fecha               = dato.fecha_de_venta_actual?.ToString("dd/MM/yyyy");
        }

        public decimal venta_pz { get; set; }
        public decimal importe { get; set; }
        public decimal importe_sin_iva { get; set; }
        public decimal costo { get; set; }
        public decimal utilidad { get; set; }
        public decimal margen { get; set; }
        public decimal importe_descuento { get; set; }
        public string fecha { get; set; }
    }
}
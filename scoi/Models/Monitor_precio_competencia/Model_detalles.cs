﻿namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_detalles
    {
        public string Clase { get; set; }
        public string Categoria { get; set; }
        public string Talla { get; set; }
        public string Color { get; set; }
        public string Familia { get; set; }

        public double Ultimo_costo { get; set; }
        public double Costo_promedio { get; set; }
        public double Precio_de_venta_captura { get; set; }
        public double Precio_de_venta { get; set; }
        public double Precio_de_oferta_actual { get; set; }

        public double Margen { get; set; }
        public double Margen_familia { get; set; }
        public double Venta_90_dias { get; set; }

        public Model_detalles(Model_monitor_precio_competencia producto)
        {
            Clase           = producto.clase_producto;
            Categoria       = producto.categoria;
            Familia         = producto.familia;
            Talla           = producto.talla;
            Color           = producto.Color;

            Ultimo_costo            = producto.ultimo_costo;
            Costo_promedio          = producto.costo_promedio;
            Precio_de_venta_captura = producto.precio_de_venta_captura;
            Precio_de_venta         = producto.precio_de_venta;
            Precio_de_oferta_actual = producto.precio_de_oferta_actual;

            Margen          = producto.margen;
            Margen_familia  = producto.margen_meta_familia;
            Venta_90_dias   = producto.venta_ultimos_90_dias;
        }
    }
}
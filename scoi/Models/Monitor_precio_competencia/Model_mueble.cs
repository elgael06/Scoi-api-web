using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_mueble : Interface_Analisis
    {
        public string Mueble { get; set; }
        public int Cantidad { get; set; }
        public int Avance { get; set; }
        public List<string> Clases = new List<string>();
        public List<string> Categorias = new List<string>();
        public List<string> Familia = new List<string>();
        public List<string> Talla = new List<string>();
        public List<string> Color = new List<string>();
        public int Diferencia { get; set; }
        public double Acumulado { get; set; }
        public List<Model_producto> Productos = new List<Model_producto>();

        public double Margen { get; set; }
        public double Margen_familia { get; set; }
        public int productos_no_cumplen = 0;

        public Model_mueble(List<Model_monitor_precio_competencia> productos) {
            Obtener_productos_lista(productos);
            Obtener_analisis(productos);
        }

        private void Obtener_productos_lista(List<Model_monitor_precio_competencia> productos)
        {
            Margen = 0;
            Margen_familia = 0;

            foreach (Model_monitor_precio_competencia producto in productos)
            {
                ObtenerMargenes(producto);
                Productos.Add(new Model_producto(producto));
                llenar_clasificadores(producto);
            }

            Margen /= productos.Count;
            Margen_familia /= productos.Count;
        }

        public void ObtenerMargenes(Model_monitor_precio_competencia producto)
        {
            Margen += producto.margen;
            Margen_familia += producto.margen_meta_familia;
            productos_no_cumplen += (producto.margen < producto.margen_meta_familia) ? 1 : 0;
        }

        private void llenar_clasificadores(Model_monitor_precio_competencia producto) {
            if (Clases.FindIndex(e => e == producto.clase_producto) == -1)
            {
                Clases.Add(producto.clase_producto);
            }
            if (Categorias.FindIndex(e => e == producto.categoria) == -1)
            {
                Categorias.Add(producto.categoria);
            }
            if (Familia.FindIndex(e => e == producto.familia) == -1)
            {
                Familia.Add(producto.familia);
            }
            if (Talla.FindIndex(e => e == producto.talla) == -1)
            {
                Talla.Add(producto.talla);
            }
            if (Color.FindIndex(e => e == producto.Color) == -1)
            {
                Color.Add(producto.Color);
            }
        }
        private void Obtener_analisis(List<Model_monitor_precio_competencia> filtro)
        {
            Cantidad = filtro.Count();
            Avance = filtro.Where(p => p.LEY_PCIO_N > 0 || p.LEY_PCIO_O > 0 ||
                                       p.LOPEZ_N > 0 || p.LOPEZ_O > 0 ||
                                       p.MEZQUITILLO_N > 0 || p.MEZQUITILLO_O > 0 ||
                                       p.BODART_N > 0 || p.BODART_O > 0 ||
                                       p.SORIANA_N > 0 || p.SORIANA_O > 0 ||
                                       p.TERESITA_N > 0 || p.TERESITA_O > 0).ToList().Count();

            if (Cantidad > 0 && Avance > 0)
            {
                Diferencia = Cantidad - Avance;
                Acumulado = (double.Parse(Avance.ToString()) / double.Parse(Cantidad.ToString()));
            }
            else
            {
                Diferencia = 0;
                Acumulado = 0.0;
            }
        }
    }
}
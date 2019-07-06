using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Modelo_pasillo_productos
    {
        public string Pasillo { get; set; }
        public int Cantidad { get; set; }
        public int Avance { get; set; }
        public int Diferencia { get; set; }
        public double Acumulado { get; set; }
        public List<Model_producto> Productos = new List<Model_producto>();

        public double Margen { get; set; }
        public double Margen_familia { get; set; }
        public int productos_no_cumplen = 0;

        public Modelo_pasillo_productos(List<Model_monitor_precio_competencia> lista)
        {
            Margen = 0;
            Margen_familia = 0;

            foreach (var p in lista )
            {
                ObtenerMargenes(p);

                Productos.Add(new Model_producto(p));
            }
            Obtener_analisis(lista);

            Margen /= lista.Count;
            Margen_familia /= lista.Count;
        }
        private void Obtener_analisis(List<Model_monitor_precio_competencia> filtro)
        {
            Cantidad = filtro.Count();
            Avance = filtro.Where(p => p.LEY_PCIO_N > 0 || p.LEY_PCIO_O > 0 ||
                                       p.LOPEZ_N > 0 || p.LOPEZ_O > 0 ||
                                       p.MEZQUITILLO_N > 0 || p.MEZQUITILLO_O > 0 ||
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
        public void ObtenerMargenes(Model_monitor_precio_competencia producto)
        {
            Margen += producto.margen;
            Margen_familia += producto.margen_meta_familia;
            productos_no_cumplen += (producto.margen < producto.margen_meta_familia) ? 1 : 0;
        }
    }
}
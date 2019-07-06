using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_mueble : Interface_Analisis
    {
        public string Mueble { get; set; }
        public int Cantidad { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int Avance { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int Diferencia { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public double Acumulado { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public List<Model_producto> Productos { get;set; }

        public Model_mueble(List<Model_monitor_precio_competencia> productos) {
            Obtener_productos_lista(productos);
        }

        private void Obtener_productos_lista(List<Model_monitor_precio_competencia> productos)
        {
            Productos = new List<Model_producto>();
            Obtener_analisis(productos);

            foreach (Model_monitor_precio_competencia producto in productos)
            {
                Productos.Add(new Model_producto(producto));
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
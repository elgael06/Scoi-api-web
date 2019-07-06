using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Modelo_precios_de_competencia_por_producto
    {
        public string Fecha = "";
        public double Ultimo_Costo = 0;
        public double Costo_promedio = 0;
        public double Margen = 0;
        public double Margen_meta = 0;

        public double Izagar = 0;
        public precios Bodart = new precios();
        public precios Ley = new precios();
        public precios Lopez = new precios();
        public precios Mesquitillo = new precios();
        public precios Soriana = new precios();
        public precios Teresita = new precios();
    }
}
﻿
namespace WebApplication.Models.Monitor_precio_competencia
{
    public class model_competencia
    {
        public precios Izagar { get; set; }
        public precios Bodart { get; set; }
        public precios Ley { get; set; }
        public precios Lopez { get; set; }
        public precios Mesquitillo { get; set; }
        public precios Soriana { get; set; }
        public precios Teresita { get; set; }

        public model_competencia(Model_monitor_precio_competencia producto)
        {
            Izagar = new precios
            {
                Normal = producto.precio_de_venta_captura,
                Oferta = producto.precio_de_oferta_actual
            };
            Bodart = new precios
            {
                Normal = producto.BODART_N,
                Oferta = producto.BODART_O
            };
            Ley = new precios
            {
                Normal = producto.LEY_PCIO_N,
                Oferta = producto.LEY_PCIO_O
            };
            Lopez = new precios
            {
                Normal = producto.LOPEZ_N,
                Oferta = producto.LOPEZ_O
            };
            Mesquitillo = new precios
            {
                Normal = producto.MEZQUITILLO_N,
                Oferta = producto.MEZQUITILLO_O
            };
            Soriana = new precios
            {
                Normal = producto.SORIANA_N,
                Oferta = producto.SORIANA_O
            };
            Teresita = new precios
            {
                Normal = producto.SORIANA_N,
                Oferta = producto.SORIANA_O
            };

        }
    }
    public class precios
    {
        public double Normal = 0;
        public double Oferta =0;
    }
}
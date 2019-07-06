
namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_producto
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public bool Estado { get; set; }
        public string Fecha { get; set; }
        public Model_detalles Detalles { get; set; }
        public model_competencia Precio { get; set; }

        public Model_producto(Model_monitor_precio_competencia producto)
        {
            string clasificacion = producto.clasificacion_8020.ToString();
            Codigo      =  producto.cod_prod;
            Descripcion = producto.descripcion;
            Fecha       = producto.fecha;
            Tipo        = clasificacion != "0" ? clasificacion : "NORMAL";
            Detalles    = new Model_detalles(producto);
            Precio      = new model_competencia(producto);
            Estado      = Checardo(producto);

        }
        private bool Checardo(Model_monitor_precio_competencia prod) => prod.LEY_PCIO_N > 0 || prod.LEY_PCIO_O > 0 || prod.SORIANA_N > 0 || prod.SORIANA_O > 0 ||
                prod.TERESITA_N > 0 || prod.TERESITA_O > 0 || prod.BODART_N > 0 || prod.BODART_O > 0 || prod.MEZQUITILLO_N > 0 ||
                prod.LOPEZ_N > 0 || prod.LOPEZ_O > 0;
    }
}
/**
  public double LEY_PCIO_N;
        public double LEY_PCIO_O;
        public double SORIANA_N;
        public double SORIANA_O;
        public double TERESITA_N;
        public double TERESITA_O;
        public double BODART_N;
        public double BODART_O;
        public double MEZQUITILLO_N;
        public double MEZQUITILLO_O;
        public double LOPEZ_N;
        public double LOPEZ_O;
     
     */

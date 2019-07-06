
namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_producto
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public Model_detalles Detalles { get; set; }
        public model_competencia Precio { get; set; }

        public Model_producto(Model_monitor_precio_competencia producto)
        {
            string clasificacion = producto.clasificacion_8020.ToString();
            Codigo      =  producto.cod_prod;
            Descripcion = producto.descripcion;
            Tipo        = clasificacion != "" ? clasificacion : "NORMAL";
            Detalles    = new Model_detalles(producto);
            Precio      = new model_competencia(producto);
        }
    }
}

namespace api_seguimiento.Models.comparativo_resultados
{
    public class Movimiento
    {
        public string Tipo_movimiento { get; set; }
        public int Semana { get; set; }
        public string Mes { get; set; }
        public int Anio { get; set; }
        public double Costo { get; set; }
        public double Precio_venta { get; set; }
    }
}
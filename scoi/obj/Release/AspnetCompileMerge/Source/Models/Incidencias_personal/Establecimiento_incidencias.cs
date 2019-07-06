
namespace api_seguimiento.Models.Incidencias_personal
{
    public class Establecimiento_incidencias : Colaborador_incidencia
    {
        public string Departatento { get; set; }
        public string Dia { get; set; }
        public int Total_Puestos { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Incidencias_apertura_tienda
{
    public class Incidencias_cuestionario
    {
        public string Cuestionario { get; set; }
        public int Solucionadas { get; set; }
        public int SinSolucion { get; set; }
        public int NoAplica { get; set; }
        public int NoResueltas { get; set; }
        public List<Incidencias_observaciones> Observaciones { get; set; }

        public Incidencias_cuestionario(List<Incidencias_crud_sql> filtro) {
            OrdenarObservaciones(filtro);
        }
        private void OrdenarObservaciones(List<Incidencias_crud_sql> filtro) {
            Observaciones = new List<Incidencias_observaciones>();
            foreach (Incidencias_crud_sql dato in filtro) {
                switch (dato.solucion) {
                    case 1:
                        Solucionadas += 1;
                        break;
                    case 0:
                        SinSolucion += 1;
                        break;
                    case 3:
                        NoResueltas += 1;
                        break;
                    default:
                        NoAplica += 1;
                        break;
                }
                Observaciones.Add(
                new Incidencias_observaciones {
                    Folio = dato.folio,
                    Pregunta = dato.pregunta,
                    Observacion = dato.observaciones,
                    Usuario = dato.Usuario,
                    Respuesta= new Incidencia(dato.solucion,dato.tipo_solucion)
                });
            }

        }
    }
}
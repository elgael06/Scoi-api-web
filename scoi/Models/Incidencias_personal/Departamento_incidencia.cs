using System.Collections.Generic;
using System.Linq;

namespace api_seguimiento.Models.Incidencias_personal
{
    public class Departamento_incidencia
    {
        public string Descripcion { set; get; }
        public string Dia { get; set; }
        public int Plantilla_autorizada { get; set; }
        public int Plantilla_real { get; set; }
        public bool Revicion { get; set; }

        public List<Colaborador_incidencia> Lista { set; get; }
        public List<Critterio_incidencia> Criterios { set; get; }

        public Departamento_incidencia(List<Establecimiento_incidencias> Personal) {
            int checados = 0;
            Lista = new List<Colaborador_incidencia>();
            List<string> aux_puestos = new List<string>(); 
            foreach(Establecimiento_incidencias e in Personal)
            {
                checados = e.Incidencia > 0 ? 1 : checados;

                int index = aux_puestos.FindIndex(r=> r == e.Puesto);
                if (index == -1) {
                    Plantilla_autorizada += e.Total_Puestos;
                    aux_puestos.Add(e.Puesto);
                }
                Plantilla_real += 1;
                Lista.Add(
                    new Colaborador_incidencia() {
                        Folio = e.Folio,
                        Nombre = e.Nombre,
                        Puesto = e.Puesto,
                        Incidencia = e.Incidencia,
                        Checador = e.Checador,
                        Color = e.Color,
                        Descripcion = e.Descripcion
                    });
            }
            Revicion = checados > 0;
        }
    }
}
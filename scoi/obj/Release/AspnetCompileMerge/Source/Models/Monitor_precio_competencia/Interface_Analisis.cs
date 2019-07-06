using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication.Models.Monitor_precio_competencia
{
    interface Interface_Analisis
    {
        int Cantidad { get; set; }
        int Avance { get; set; }
        int Diferencia { get; set; }
        double Acumulado { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.objetos
{
    public class ConexionesSQL
    {
        public SqlConnection Scoi()
        {
            return new SqlConnection("server=192.168.2.98 ; database=Grupo_Izagar ; Persist Security Info=True;User ID=sa;Password='Ragazi/*-1'");
        }
        public SqlConnection Scoi_pruebas()
        {
            return new SqlConnection("server=192.168.2.98 ; database=Grupo_Izagar_P ; Persist Security Info=True;User ID=sa;Password='Ragazi/*-1'");
        }
        public SqlConnection Bms()
        {
            return new SqlConnection("server=192.168.2.98 ; database=BMSIZAGAR ; Persist Security Info=True;User ID=sa;Password='Ragazi/*-1'");
        }
        public SqlConnection Web()
        {
            return new SqlConnection("server=192.168.4.200 ; database=SEGUIMIENTO_2 ; Persist Security Info=True;User ID=sa;Password='Ragazi/*-1'");
        }
        public SqlConnection Sistema94()
        {
            return new SqlConnection("server=192.168.2.94 ; database=Grupo_Izagar ; Persist Security Info=True;User ID=sa;Password='ragazi*12345'");
        }
    }
}
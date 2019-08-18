using System;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class FlujoDatosInvetario : DbContext
    {
        public FlujoDatosInvetario() : base("name=Entities")
        {

            SetCommandTimeOut(6000);
        }

        public void SetCommandTimeOut(int Timeout)
        {
            var objectContext = (this as IObjectContextAdapter).ObjectContext;
            objectContext.CommandTimeout = Timeout;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public virtual ObjectResult<monitor_flujo_de_inventario_Result> monitor_flujo_de_inventario(Nullable<System.DateTime> fi, Nullable<byte> meses)
        {
            var fiParameter     = fi.HasValue ? new ObjectParameter("fi", fi) : new ObjectParameter("fi", typeof(System.DateTime));
            var mesesParameter  = meses.HasValue ? new ObjectParameter("meses", meses) : new ObjectParameter("meses", typeof(byte));

            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<monitor_flujo_de_inventario_Result>("monitor_flujo_de_inventario", fiParameter, mesesParameter);
        }
    }
}
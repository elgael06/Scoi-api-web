namespace WebApplication.Models.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class accesos_menu
    {
        [Key]
        [Column(Order = 0)]
        public int folio_menu { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string menu { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(2)]
        public string estatus { get; set; }

        [StringLength(50)]
        public string icon { get; set; }
    }
}

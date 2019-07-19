namespace WebApplication.Models.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sub_menu
    {
        [Key]
        [Column(Order = 0)]
        public int folio_sub_menu { get; set; }

        [Key]
        [Column("sub_menu", Order = 1)]
        [StringLength(60)]
        public string sub_menu1 { get; set; }

        [Key]
        [Column(Order = 2)]
        public byte menu { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(1)]
        public string estatus { get; set; }
    }
}

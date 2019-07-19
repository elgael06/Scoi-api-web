namespace WebApplication.Models.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class accesos_submenu
    {
        [Key]
        [Column(Order = 0)]
        public int folio_submeu { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string submenu { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int folio_menu { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(2)]
        public string estatus { get; set; }

        [StringLength(50)]
        public string icon { get; set; }
    }
}

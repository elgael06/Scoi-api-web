namespace WebApplication.Models.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class acceso_url
    {
        [Key]
        [Column(Order = 0)]
        public int folio_acceso { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string acceso { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(100)]
        public string url { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int folio_submenu { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(2)]
        public string estatus { get; set; }
    }
}

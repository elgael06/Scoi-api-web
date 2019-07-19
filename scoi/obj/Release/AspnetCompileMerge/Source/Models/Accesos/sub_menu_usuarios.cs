namespace WebApplication.Models.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class sub_menu_usuarios
    {
        [Key]
        [Column(Order = 0)]
        public int folio_sub_menu_usuarios { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_usuario { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int folio_sub_menu { get; set; }

        [Key]
        [Column(Order = 3)]
        public bool acceso { get; set; }
    }
}

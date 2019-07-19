namespace WebApplication.Manager.Accesos
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class usuarios
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_usuario { get; set; }

        [Key]
        [StringLength(50)]
        public string nombre_usuario { get; set; }

        public string nombrecompleto_usuario { get; set; }

        [StringLength(50)]
        public string email_usuario { get; set; }

        [StringLength(2)]
        public string nivel_usuario { get; set; }

        [StringLength(50)]
        public string password_usuario { get; set; }

        public int? id_scoi { get; set; }

        public string notificaciones { get; set; }

        [Column(TypeName = "image")]
        public byte[] foto { get; set; }
    }
}

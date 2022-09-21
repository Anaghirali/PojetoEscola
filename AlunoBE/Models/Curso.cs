using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Curso
    {
        public int id { get; set; }

        [Required]
        public int codCurso { get; set; }

        [Required]
        [StringLength(30, ErrorMessage ="O campo nome do curso não pode passar de 30 digitos")]
        public string? nomeCurso { get; set; }

        [Required]
        //[MaxLength(2,ErrorMessage = "Campo deve ter 2(dois) caracteres")]
        public string? periodo { get; set; }

    }
}
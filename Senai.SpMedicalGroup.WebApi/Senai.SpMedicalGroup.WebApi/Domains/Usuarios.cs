using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Usuarios
    {
        public Usuarios()
        {
            Medicos = new HashSet<Medicos>();
            Prontuarios = new HashSet<Prontuarios>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Email deve ser informado.")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha deve ser informada.")]
        [DataType(DataType.Password)]
        [StringLength(30, MinimumLength = 4, ErrorMessage = "Senha deve possuir pelo menos 4 caracteres.")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "Campo IdTipoUsuario deve ser informado.")]
        public int IdTipoUsuario { get; set; }

        public TiposUsuarios IdTipoUsuarioNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }
    }
}

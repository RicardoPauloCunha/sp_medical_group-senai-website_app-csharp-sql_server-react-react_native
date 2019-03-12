using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Medicos
    {
        public Medicos()
        {
            Consultas = new HashSet<Consultas>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Nome deve ser informado.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "CRM deve ser informado.")]
        public string Crm { get; set; }

        [Required(ErrorMessage = "Campo IdEspecialidade deve ser informado.")]
        public int IdEspecialidade { get; set; }

        [Required(ErrorMessage = "Campo IdUsuario deve ser informado.")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "Campo IdClinica deve ser informado.")]
        public int IdClinica { get; set; }

        public Clinicas IdClinicaNavigation { get; set; }
        public Especialidades IdEspecialidadeNavigation { get; set; }
        public Usuarios IdUsuarioNavigation { get; set; }
        public ICollection<Consultas> Consultas { get; set; }
    }
}

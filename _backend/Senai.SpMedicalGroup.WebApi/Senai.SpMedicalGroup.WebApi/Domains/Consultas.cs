using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Consultas
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo IdProntuario deve ser informado.")]
        public int IdProntuario { get; set; }

        [Required(ErrorMessage = "Campo IdMedico deve ser informado.")]
        public int IdMedico { get; set; }

        [Required(ErrorMessage = "Data da Consulta deve ser informada.")]
        [DataType(DataType.Date)]
        public DateTime DataAgendada { get; set; }

        [Required(ErrorMessage = "Hora da Consulta deve ser informada.")]
        public TimeSpan HoraAgendada { get; set; }

        public int IdSituacao { get; set; }

        public string Descricao { get; set; }

        public Medicos IdMedicoNavigation { get; set; }
        public Prontuarios IdProntuarioNavigation { get; set; }
        public Situacao IdSituacaoNavigation { get; set; }
    }
}

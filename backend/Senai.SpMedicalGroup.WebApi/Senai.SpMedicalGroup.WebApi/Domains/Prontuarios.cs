using Senai.SpMedicalGroup.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Prontuarios
    {
        public Prontuarios()
        {
            Consultas = new HashSet<Consultas>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Nome deve ser informado.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "RG deve ser informado.")]
        [StringLength(14, MinimumLength = 12, ErrorMessage = "RG deve possuir no máximo 14(com . e -) caracteres e no minimo 12(apenas numeros).")]
        public string Rg { get; set; }

        [Required(ErrorMessage = "CPF deve ser informado.")]
        [StringLength(10, MinimumLength = 9, ErrorMessage = "CPF deve possuir no máximo 10(com -) caracteres e no minimo 9(apenas numeros).")]
        public string Cpf { get; set; }

        //[DataType(DataType.Date)]
        [Required(ErrorMessage = "Data de Nascimento deve ser informado.")]
        [CurrentDate(ErrorMessage = "Data de nascimento deve ser meno que a data atual.")]
        public DateTime DataNascimento { get; set; }

        [StringLength(20, MinimumLength = 9,ErrorMessage = "Telefone deve possuir no máximo 20 caracteres e no minimo 9.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "Campo IdUsuario deve ser informado.")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "Rua deve ser informado.")]
        public string Rua { get; set; }

        public string Bairro { get; set; }

        [Required(ErrorMessage = "Cidade deve ser informado.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Estado deve ser informado.")]
        [StringLength(2, ErrorMessage = "Coloque apenas a Sigla do estado, no maximo 2 caracteres.")]
        public string Estado { get; set; }

        [StringLength(9, ErrorMessage = "CEP deve possuir no máximo 9 caracteres.")]
        [Required(ErrorMessage = "Cep deve ser informado.")]
        public string Cep { get; set; }

        public Usuarios IdUsuarioNavigation { get; set; }
        public ICollection<Consultas> Consultas { get; set; }
    }
}

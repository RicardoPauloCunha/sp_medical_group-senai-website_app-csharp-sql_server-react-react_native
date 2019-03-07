using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IConsultasRepositorio
    {
        void Cadastrar(Consultas consultaRecebida);

        List<Consultas> Listar();

        void Alterar(Consultas consultaRecebida);

        void Deletar(Consultas consulta);

        Consultas BuscarConsulta(int consultaId);

        List<Consultas> BuscarConsultasDeMedico(int medicoId);

        List<Consultas> BuscarConsultasDePaciente(int Paciente);
    }
}

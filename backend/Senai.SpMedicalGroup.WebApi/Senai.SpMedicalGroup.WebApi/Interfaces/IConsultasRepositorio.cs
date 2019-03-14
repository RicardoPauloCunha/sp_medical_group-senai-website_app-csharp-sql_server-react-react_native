using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IConsultasRepositorio
    {
        /// <summary>
        /// Cadastra uma nova Consulta no banco de dados
        /// </summary>
        /// <param name="consultaRecebida">Consulta para cadastrar</param>
        void Cadastrar(Consultas consultaRecebida);

        /// <summary>
        /// Lista todas as Consultas existentes no banco de dados
        /// </summary>
        /// <returns>Retorna uma lista de Consultas</returns>
        List<Consultas> Listar();

        /// <summary>
        /// Altera uma Consulta
        /// </summary>
        /// <param name="consultaRecebida">Consulta para alterar</param>
        void Alterar(Consultas consultaRecebida);

        /// <summary>
        /// Deleta uma Consulta
        /// </summary>
        /// <param name="consulta">Consulta para deletar</param>
        void Deletar(Consultas consulta);

        /// <summary>
        /// Busca uma única Consulta
        /// </summary>
        /// <param name="consultaId">Id da Consulta procurada</param>
        /// <returns>Retorna a Consulta encontrada</returns>
        Consultas BuscarConsulta(int consultaId);

        /// <summary>
        /// Lista todas as Consultas referentes um Médico
        /// </summary>
        /// <param name="medicoId">Id do Medico</param>
        /// <returns>Retorna as Consultas encontradas referentes aquele Medico</returns>
        List<Consultas> BuscarConsultasDeMedico(int medicoId);

        /// <summary>
        /// Lista todas as Consultas referentes um Paciente
        /// </summary>
        /// <param name="medicoId">Id do Prontuario do Paciente</param>
        /// <returns>Retorna as Consultas encontradas referentes aquele Prontuario</returns>
        List<Consultas> BuscarConsultasDePaciente(int prontuarioId);
    }
}

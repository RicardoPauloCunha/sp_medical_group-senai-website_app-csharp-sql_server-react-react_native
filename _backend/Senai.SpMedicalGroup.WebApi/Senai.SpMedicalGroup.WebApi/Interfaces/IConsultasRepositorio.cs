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
        List<Consultas> BuscarConsultasDeUsuario(int usuarioTipo, int usuarioLog);

        /// <summary>
        /// Altera a descricao da Consulta do Paciente
        /// </summary>
        /// <param name="descricaoRebecida">Descricao da consulta</param>
        /// <param name="consultaRecebida">Consulta correspondente a essa descricao</param>
        /// <returns>Retorna a consulta atualizada</returns>
        Consultas AlterarDecricaoPaciente(Consultas descricaoRebecida, Consultas consultaRecebida);

        /// <summary>
        /// Altera a situacao da Consulta do paciente
        /// </summary>
        /// <param name="situacaoRebecida">Situacao da Consulta</param>
        /// <param name="consultaRecebida">Consulta correspondete a essa situacao</param>
        /// <returns>Retorna a consulta atualizada</returns>
        Consultas AlterarSituacaoPaciente(Consultas situacaoRebecida, Consultas consultaRecebida);

        List<Consultas> ListarConsultasInclude();

        List<Consultas> ListarConsultasUsuarioInclude(int usuarioTipo, int usuarioLog);
    }
}

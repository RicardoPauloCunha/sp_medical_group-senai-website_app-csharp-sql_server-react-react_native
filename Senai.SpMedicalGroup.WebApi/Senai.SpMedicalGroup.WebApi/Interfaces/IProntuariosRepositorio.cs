using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IProntuariosRepositorio
    {
        /// <summary>
        /// Lista todos os Prontuarios
        /// </summary>
        /// <returns>Retorna uma lista de Prontuarios</returns>
        List<Prontuarios> Listar();

        /// <summary>
        /// Cadastra um novo Prontuario no banco de dados
        /// </summary>
        /// <param name="prontuario">Prontuario a ser cadastrado</param>
        void Cadastrar(Prontuarios prontuario);

        /// <summary>
        /// Altera um Prontuario
        /// </summary>
        /// <param name="prontuario">Prontuario a ser alterado</param>
        void Alterar(Prontuarios prontuario);

        /// <summary>
        /// Busca um Prontuario especifico
        /// </summary>
        /// <param name="prontuarioId">Id do Prontuario buscado</param>
        /// <returns>Retorna o Prontuario Buscado</returns>
        Prontuarios BuscarProntuario(int prontuarioId);

        /// <summary>
        /// Deleta um Prontuario
        /// </summary>
        /// <param name="prontuario">Prontuario para deletar</param>
        void Deletar(Prontuarios prontuario);
    }
}

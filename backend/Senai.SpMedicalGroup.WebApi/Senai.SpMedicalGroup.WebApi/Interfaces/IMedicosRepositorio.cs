using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IMedicosRepositorio
    {
        /// <summary>
        /// Lista todos os Medicos
        /// </summary>
        /// <returns>Retorna uma lista de Medicos</returns>
        List<Medicos> Listar();

        /// <summary>
        /// Busca um único Medico
        /// </summary>
        /// <param name="medicoId">Id do Medico buscado</param>
        /// <returns>Retorna o medico encontrado</returns>
        Medicos BuscarMedico(int medicoId);

        /// <summary>
        /// Cadastra um novo medico
        /// </summary>
        /// <param name="medico">Medico a ser cadastrado</param>
        void Cadastrar(Medicos medico);

        /// <summary>
        /// Altera um medico
        /// </summary>
        /// <param name="medico">Medico a ser alterado</param>
        void Alterar(Medicos medico);

        /// <summary>
        /// Deleta um Medico
        /// </summary>
        /// <param name="medico">Medico para deletar</param>
        void Deletar(Medicos medico);
    }
}

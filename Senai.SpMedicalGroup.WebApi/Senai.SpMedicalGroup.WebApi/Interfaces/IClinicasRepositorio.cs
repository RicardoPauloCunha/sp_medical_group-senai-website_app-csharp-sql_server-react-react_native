using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IClinicasRepositorio
    {
        /// <summary>
        /// Lista todas as Clinicas
        /// </summary>
        /// <returns>Retorna uma lista de Clinicas</returns>
        List<Clinicas> Listar();

        /// <summary>
        /// Busca uma Clinica especifica
        /// </summary>
        /// <param name="clinicaId">Id da Clinica buscada</param>
        /// <returns>Retorna a Clinica encotrada</returns>
        Clinicas BuscarClinica(int clinicaId);

        /// <summary>
        /// Cadastra uma nova Clinica
        /// </summary>
        /// <param name="clinicaRecebida">Clinica a ser cadastrada</param>
        void Cadastrar(Clinicas clinicaRecebida);

        /// <summary>
        /// Altera os dados de uma Clinica
        /// </summary>
        /// <param name="clininaRebecida">Novos dados da Clinica</param>
        void Alterar(Clinicas clininaRebecida);

        /// <summary>
        /// Deleta uma Clinica
        /// </summary>
        /// <param name="clininaRecebida">Clinica a ser deletada</param>
        void Deletar(Clinicas clininaRecebida);
    }
}

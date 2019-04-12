using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IUsuariosRepositorio
    {
        /// <summary>
        /// Lista todos os Usuários
        /// </summary>
        /// <returns>Retorna uma lista de Usuarios</returns>
        List<Usuarios> Listar();

        /// <summary>
        /// Lista todos os Usuários com seu respectivos Pacientes ou Médicos
        /// </summary>
        /// <returns>Retorna uma lista de Usuários com os dados dos Pacientes ou Médicos</returns>
        List<Usuarios> ListarUserPacMedCorr();

        /// <summary>
        /// Cadastrar um novo Usuário
        /// </summary>
        /// <param name="usuarioRecebido">Usuário para cadastrar</param>
        void Cadastrar(Usuarios usuarioRecebido);

        /// <summary>
        /// Atualiza um Usuário
        /// </summary>
        /// <param name="usuarioRecebido">Usuário para atualizar</param>
        void Alterar(Usuarios usuarioRecebido);

        /// <summary>
        /// Busca um único Usuário
        /// </summary>
        /// <param name="usuarioId">Id do Usuário Buscado</param>
        /// <returns>Retorna o Usuário encotrado</returns>
        Usuarios BuscarUsuario(int usuarioId);

        /// <summary>
        /// Deleta um Usuario
        /// </summary>
        /// <param name="usuario">Usuario para deletar</param>
        void Deletar(Usuarios usuario);

        Usuarios Logar(LoginViewModel login);
    }
}

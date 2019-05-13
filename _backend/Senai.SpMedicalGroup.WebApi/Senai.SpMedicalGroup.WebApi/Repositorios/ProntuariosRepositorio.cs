using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class ProntuariosRepositorio : IProntuariosRepositorio
    {
        // Altera um Prontuario
        public void Alterar(Prontuarios prontuarioRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Update(prontuarioRecebido);
                ctx.SaveChanges();
            }
        }

        // Busca um Prontuario especifico
        public Prontuarios BuscarProntuario(int prontuarioId)
        {
            Prontuarios prontuario = new Prontuarios();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                prontuario = ctx.Prontuarios.Find(prontuarioId);
            }

            return prontuario;
        }

        // Cadastra um novo Prontuario
        public void Cadastrar(Prontuarios prontuarioRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Add(prontuarioRecebido);
                ctx.SaveChanges();
            }
        }

        // Deleta um Prontuario
        public void Deletar(Prontuarios prontuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Prontuarios.Remove(prontuario);
                ctx.SaveChanges();
            }
        }

        // Lista todos os Prontuarios
        public List<Prontuarios> Listar()
        {
            List<Prontuarios> prontuarios = new List<Prontuarios>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                prontuarios = ctx.Prontuarios.ToList();
            }

            return prontuarios;
        }

        private readonly string StringConexao = "Data source =.\\SqlExpress; Initial Catalog = SENAI_SPMEDICALGROUP_MANHA; user id=sa; pwd=132";

        public List<Prontuarios> ListarProntuariosInclude()
        {
            List<Prontuarios> listaProntuarios = new List<Prontuarios>();
            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string select = "SELECT P.ID, P.NOME, P.RG, P.CPF, P.DATA_NASCIMENTO, P.TELEFONE, U.EMAIL AS USUARIO, P.RUA, P.BAIRRO, P.CIDADE, P.ESTADO, P.CEP FROM PRONTUARIOS P JOIN USUARIOS U ON P.ID_USUARIO = U.ID;";
                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();

                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            Prontuarios prontuario = new Prontuarios()
                            {
                                Id = Convert.ToInt32(sqr["ID"]),
                                Nome = sqr["NOME"].ToString(),
                                Rg = sqr["RG"].ToString(),
                                Cpf = sqr["CPF"].ToString(),
                                DataNascimento = Convert.ToDateTime(sqr["DATA_NASCIMENTo"]),
                                Telefone = sqr["TELEFONE"].ToString(),
                                IdUsuarioNavigation = new Usuarios()
                                {
                                    Email = sqr["USUARIO"].ToString()
                                },
                                Rua = sqr["RUA"].ToString(),
                                Bairro = sqr["BAIRRO"].ToString(),
                                Cidade = sqr["CIDADE"].ToString(),
                                Estado = sqr["ESTADO"].ToString(),
                                Cep = sqr["CEP"].ToString(),
                            };

                            listaProntuarios.Add(prontuario);
                        }
                    }
                    return listaProntuarios;
                }
            }
        }

        //Busca paciente por usuario
        public Prontuarios pacienteLogado(int usuarioId)
        {
            Prontuarios pacienteLog = new Prontuarios();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                pacienteLog = ctx.Prontuarios.ToList().Find(p => p.IdUsuario == usuarioId);
            }

            return pacienteLog;
        }
    }
}

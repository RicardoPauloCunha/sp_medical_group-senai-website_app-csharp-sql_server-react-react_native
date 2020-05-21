using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class MedicosRepositorio : IMedicosRepositorio
    {
        private readonly string stringConexao = "Data source =.\\SQLSERVERJIROS;Initial Catalog=SpMedicalGroup; User id=sa; pwd=ji_15?27101001_roS";

        // Altera um medico
        public void Alterar(Medicos medicoRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Update(medicoRecebido);
                ctx.SaveChanges();
            }
        }

        // Busca um unico medico
        public Medicos BuscarMedico(int medicoId)
        {
            Medicos medico = new Medicos();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                medico = ctx.Medicos.Find(medicoId);
            }

            return medico;
        }

        // Cadastra um medico
        public void Cadastrar(Medicos medicoRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Add(medicoRecebido);
                ctx.SaveChanges();
            }
        }

        // Deleta um medico
        public void Deletar(Medicos medico)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Medicos.Remove(medico);
                ctx.SaveChanges();
            }
        }

        // Lista todos os medicos
        public List<Medicos> Listar()
        {
            List<Medicos> medicos = new List<Medicos>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                medicos = ctx.Medicos.ToList();
            }

            return medicos;
        }

        // Lista todas as especialidades de médicos
        public List<Especialidades> ListarEspecialidades()
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                return (ctx.Especialidades.ToList());
            }
        }

        // Busca medico por usuario
        public Medicos medicoLogado(int usuarioId)
        {
            Medicos medicoLog = new Medicos();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                medicoLog = ctx.Medicos.ToList().Find(m => m.IdUsuario == usuarioId);
            }

            return medicoLog;
        }

        // Lista Medicos com includes feito na "mão"
        public List<Medicos> ListarMedicosInclude()
        {
            List<Medicos> listaMedicos = new List<Medicos>();
            using (SqlConnection con = new SqlConnection(stringConexao))
            {
                string select = "SELECT M.ID, M.NOME, M.CRM, E.NOME AS ESPECIALIDADE, U.EMAIL AS USUARIO, C.NOME_FANTASIA AS CLINICA FROM MEDICOS M JOIN ESPECIALIDADES E ON M.ID_ESPECIALIDADE = E.ID JOIN USUARIOS U ON M.ID_USUARIO = U.ID JOIN CLINICAS C ON M.ID_CLINICA = C.ID;";
                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();
                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            Medicos medico = new Medicos()
                            {
                                Id = Convert.ToInt32(sqr["ID"]),
                                Nome = sqr["NOME"].ToString(),
                                Crm = sqr["CRM"].ToString(),
                                IdEspecialidadeNavigation = new Especialidades()
                                {
                                    Nome = sqr["ESPECIALIDADE"].ToString()
                                },
                                IdUsuarioNavigation = new Usuarios()
                                {
                                    Email = sqr["USUARIO"].ToString()
                                },
                                IdClinicaNavigation = new Clinicas()
                                {
                                    NomeFantasia = sqr["CLINICA"].ToString()
                                }
                            };
                            listaMedicos.Add(medico);
                        }
                    }
                    return listaMedicos;
                }
            }
        }
    }
}

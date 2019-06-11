using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class ConsultasRepositorio : IConsultasRepositorio
    {
        // Atualiza uma Consulta
        public void Alterar(Consultas consultaRecebida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consultaRecebida);
                ctx.SaveChanges();
            }
        }

        // Alterar descricao da Consulta
        public Consultas AlterarDecricaoPaciente(Consultas descricaoRebecida, Consultas consultaRecebida)
        {
            consultaRecebida.Descricao = descricaoRebecida.Descricao;

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consultaRecebida);
                ctx.SaveChanges();
            }

            return consultaRecebida;
        }

        // Altera situacao da Consulta
        public Consultas AlterarSituacaoPaciente(Consultas situacaoRebecida, Consultas consultaRecebida)
        {
            consultaRecebida.IdSituacao = situacaoRebecida.IdSituacao;

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consultaRecebida);
            }

            return consultaRecebida;
        }

        // Lista uma Consulta especifica
        public Consultas BuscarConsulta(int consultaId)
        {
            Consultas consultaBuscada = new Consultas();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                consultaBuscada = ctx.Consultas.ToList().Find(c => c.Id == consultaId);
            }

            return consultaBuscada;
        }

        // Lista todas as Consulta referentes a um Usuario
        public List<Consultas> BuscarConsultasDeUsuario(int usuarioTipo, int usuarioLog)
        {
            List<Consultas> consultasUsuario = new List<Consultas>();

            if (usuarioTipo == 2)
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    consultasUsuario = ctx.Consultas.ToList().FindAll(c => c.IdMedico == usuarioLog);
                }

                return consultasUsuario;

            }
            else if (usuarioTipo == 3)
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    consultasUsuario = ctx.Consultas.ToList().FindAll(c => c.IdProntuario == usuarioLog);
                }

                return consultasUsuario;
            }

            return null;
        }

        // Cadastra uma nova Consulta
        public void Cadastrar(Consultas consultaRecebida)
        {
            consultaRecebida.IdSituacao = 1;
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Add(consultaRecebida);
                ctx.SaveChanges();
            }
        }

        // Deleta um Consulta
        public void Deletar(Consultas consulta)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Remove(consulta);
                ctx.SaveChanges();
            }
        }

        // Lista todas as Consultas
        public List<Consultas> Listar()
        {
            List<Consultas> consultas = new List<Consultas>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                consultas = ctx.Consultas.ToList();
            }

            return consultas;
        }

        private readonly string StringConexao = "Server=tcp:serversenaircd.database.windows.net,1433;Initial Catalog=SENAI_SPMEDICALGROUP_MANHA;Persist Security Info=False;User ID=ricardopaulo;Password=Dcrp246dragon;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        // lista todas as consultas, com prontuario, medico e situacao da consulta
        public List<Consultas> ListarConsultasInclude()
        {
            List<Consultas> listaConsultas = new List<Consultas>();

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string select = "SELECT C.ID, P.NOME AS PRONTUARIO, M.NOME AS MEDICO, C.DATA_AGENDADA, C.HORA_AGENDADA, S.NOME AS SITUACAO, C.DESCRICAO FROM CONSULTAS C JOIN PRONTUARIOS P ON C.ID_PRONTUARIO = P.ID JOIN MEDICOS M ON C.ID_MEDICO = M.ID JOIN SITUACAO S ON C.ID_SITUACAO = S.ID;";
                con.Open();

                using (SqlCommand cmd = new SqlCommand(select, con))
                {
                    SqlDataReader sqr = cmd.ExecuteReader();

                    if (sqr.HasRows)
                    {
                        while (sqr.Read())
                        {
                            var hora = sqr["HORA_AGENDADA"];
                            TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));

                            Consultas consulta = new Consultas()
                            {
                                Id = Convert.ToInt32(sqr["ID"]),
                                IdProntuarioNavigation = new Prontuarios()
                                {
                                    Nome = sqr["PRONTUARIO"].ToString()
                                },
                                IdMedicoNavigation = new Medicos()
                                {
                                    Nome = sqr["MEDICO"].ToString()
                                },
                                DataAgendada = Convert.ToDateTime(sqr["DATA_AGENDADA"]),
                                HoraAgendada = horaSpan,
                                IdSituacaoNavigation = new Situacao()
                                {
                                    Nome = sqr["SITUACAO"].ToString(),
                                },
                                Descricao = sqr["DESCRICAO"].ToString()
                            };

                            listaConsultas.Add(consulta);
                        }
                    }
                    return listaConsultas;
                }
            }
        }

        // lista todas as consultas de um usuario logado, com prontuario, medico e situacao da consulta
        public List<Consultas> ListarConsultasUsuarioInclude(int usuarioTipo, int usuarioLog)
        {
            List<Consultas> consultasUsuario = new List<Consultas>();

            //lista consultas de medicos logados
            if (usuarioTipo == 2)
            {
                using (SqlConnection con = new SqlConnection(StringConexao))
                {
                    string select = "SELECT C.ID, P.NOME AS PRONTUARIO, M.NOME AS MEDICO, C.DATA_AGENDADA, C.HORA_AGENDADA, S.NOME AS SITUACAO, C.DESCRICAO FROM CONSULTAS C JOIN PRONTUARIOS P ON C.ID_PRONTUARIO = P.ID JOIN MEDICOS M ON C.ID_MEDICO = M.ID JOIN SITUACAO S ON C.ID_SITUACAO = S.ID WHERE C.ID_MEDICO = @IDUSUARIOLOG;";
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(select, con))
                    {
                        cmd.Parameters.AddWithValue("IDUSUARIOLOG", usuarioLog);

                        SqlDataReader sqr = cmd.ExecuteReader();

                        if (sqr.HasRows)
                        {
                            while (sqr.Read())
                            {
                                var hora = sqr["HORA_AGENDADA"];
                                TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));

                                Consultas consulta = new Consultas()
                                {
                                    Id = Convert.ToInt32(sqr["ID"]),
                                    IdProntuarioNavigation = new Prontuarios()
                                    {
                                        Nome = sqr["PRONTUARIO"].ToString()
                                    },
                                    IdMedicoNavigation = new Medicos()
                                    {
                                        Nome = sqr["MEDICO"].ToString()
                                    },
                                    DataAgendada = Convert.ToDateTime(sqr["DATA_AGENDADA"]),
                                    HoraAgendada = horaSpan,
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Nome = sqr["SITUACAO"].ToString(),
                                    },
                                    Descricao = sqr["DESCRICAO"].ToString()
                                };

                                consultasUsuario.Add(consulta);
                            }
                        }
                        return consultasUsuario;
                    }
                }
            }
            // lista consultas de pacientes logados
            else if (usuarioTipo == 3)
            {
                using (SqlConnection con = new SqlConnection(StringConexao))
                {
                    string select = "SELECT C.ID, P.NOME AS PRONTUARIO, M.NOME AS MEDICO, C.DATA_AGENDADA, C.HORA_AGENDADA, S.NOME AS SITUACAO, C.DESCRICAO FROM CONSULTAS C JOIN PRONTUARIOS P ON C.ID_PRONTUARIO = P.ID JOIN MEDICOS M ON C.ID_MEDICO = M.ID JOIN SITUACAO S ON C.ID_SITUACAO = S.ID WHERE C.ID_PRONTUARIO = @IDUSUARIOLOG;";
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(select, con))
                    {
                        cmd.Parameters.AddWithValue("IDUSUARIOLOG", usuarioLog);

                        SqlDataReader sqr = cmd.ExecuteReader();

                        if (sqr.HasRows)
                        {
                            while (sqr.Read())
                            {
                                var hora = sqr["HORA_AGENDADA"];
                                TimeSpan horaSpan = (TimeSpan)Convert.ChangeType(hora, typeof(TimeSpan));

                                Consultas consulta = new Consultas()
                                {
                                    Id = Convert.ToInt32(sqr["ID"]),
                                    IdProntuarioNavigation = new Prontuarios()
                                    {
                                        Nome = sqr["PRONTUARIO"].ToString()
                                    },
                                    IdMedicoNavigation = new Medicos()
                                    {
                                        Nome = sqr["MEDICO"].ToString()
                                    },
                                    DataAgendada = Convert.ToDateTime(sqr["DATA_AGENDADA"]),
                                    HoraAgendada = horaSpan,
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Nome = sqr["SITUACAO"].ToString(),
                                    },
                                    Descricao = sqr["DESCRICAO"].ToString()
                                };

                                consultasUsuario.Add(consulta);
                            }
                        }
                        return consultasUsuario;
                    }
                }
            }

            return null;
        }
    }
}

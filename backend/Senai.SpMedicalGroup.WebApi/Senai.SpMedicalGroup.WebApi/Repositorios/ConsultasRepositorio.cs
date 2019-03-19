using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
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

        // Lista todas as Consulta referentes a um Medico
        public List<Consultas> BuscarConsultasDeUsuario(int? medicoId, int? prontuarioId)
        {
            if (medicoId != null && medicoId != 0)
            {
                List<Consultas> consultasMedico = new List<Consultas>();

                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    consultasMedico = ctx.Consultas.ToList().FindAll(c => c.IdMedico == medicoId);
                }

                return consultasMedico;
            } else if (prontuarioId != null && prontuarioId != 0)
            {
                List<Consultas> consultaspaciente = new List<Consultas>();

                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    consultaspaciente = ctx.Consultas.ToList().FindAll(c => c.IdProntuario == prontuarioId);
                }

                return consultaspaciente;
            }

            return null;
        }

        // Cadastra uma nova Consulta
        public void Cadastrar(Consultas consultaRecebida)
        {
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
    }
}

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
        public List<Consultas> BuscarConsultasDeMedico(int medicoId)
        {
            List<Consultas> consultasMedico = new List<Consultas>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                consultasMedico = ctx.Consultas.ToList().FindAll(c => c.IdMedico == medicoId);
            }

            return consultasMedico;
        }

        // Lista todas as Consulta referentes a um Paciente
        public List<Consultas> BuscarConsultasDePaciente(int prontuarioId)
        {
            List<Consultas> consultasPaciente = new List<Consultas>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                consultasPaciente = ctx.Consultas.ToList().FindAll(c => c.IdProntuario == prontuarioId);
            }

            return consultasPaciente;
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

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
        public void Alterar(Consultas consultaRecebida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Update(consultaRecebida);
            }
        }

        public Consultas BuscarConsulta(int consultaId)
        {
            Consultas consultaBuscada = new Consultas();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                consultaBuscada = ctx.Consultas.ToList().Find(c => c.Id == consultaId);
            }

            return consultaBuscada;
        }

        public List<Consultas> BuscarConsultasDeMedico(int medicoId)
        {
            throw new NotImplementedException();
        }

        public List<Consultas> BuscarConsultasDePaciente(int Paciente)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Consultas consultaRecebida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Add(consultaRecebida);
                ctx.SaveChanges();
            }
        }

        public void Deletar(Consultas consulta)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Consultas.Remove(consulta);
            }
        }

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

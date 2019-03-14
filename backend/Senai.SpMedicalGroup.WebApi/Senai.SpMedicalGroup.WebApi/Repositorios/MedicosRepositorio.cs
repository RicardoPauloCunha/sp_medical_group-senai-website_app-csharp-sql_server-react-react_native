using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class MedicosRepositorio : IMedicosRepositorio
    {
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
    }
}

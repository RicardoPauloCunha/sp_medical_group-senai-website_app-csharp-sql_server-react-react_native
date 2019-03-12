using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class ClinicasRepositorio : IClinicasRepositorio
    {
        // Altera uma Clinica
        public void Alterar(Clinicas clininaRebecida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Update(clininaRebecida);
                ctx.SaveChanges();
            }
        }

        // Busca uma Clinica especifica
        public Clinicas BuscarClinica(int clinicaId)
        {
            Clinicas clinica = new Clinicas();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                clinica = ctx.Clinicas.Find(clinicaId);
            }

            return clinica;
        }

        // Cadastrar uma Clinica
        public void Cadastrar(Clinicas clinicaRecebida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Add(clinicaRecebida);
                ctx.SaveChanges();
            }
        }

        // Deleta uma Clinica
        public void Deletar(Clinicas clininaRecebida)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Clinicas.Remove(clininaRecebida);
                ctx.SaveChanges();
            }
        }

        // Lista todas as Clinicas
        public List<Clinicas> Listar()
        {
            List<Clinicas> clinicas = new List<Clinicas>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                clinicas = ctx.Clinicas.Include("Medicos").ToList();
            }

            return clinicas;
        }
    }
}

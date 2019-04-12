using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
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

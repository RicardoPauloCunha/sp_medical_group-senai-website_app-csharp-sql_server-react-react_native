using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositorios
{
    public class UsuariosRepositorio : IUsuariosRepositorio
    {
        // Altera um Usuario
        public void Alterar(Usuarios usuarioRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Update(usuarioRecebido);
                ctx.SaveChanges();
            }
        }
        
        // Busca um usuario
        public Usuarios BuscarUsuario(int usuarioId)
        {
            Usuarios usuarioBuscado = new Usuarios();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                usuarioBuscado = ctx.Usuarios.Find(usuarioId);
            }

            return usuarioBuscado;
        }

        // Cadastra um novo Usuário
        public void Cadastrar(Usuarios usuarioRecebido)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Add(usuarioRecebido);
                ctx.SaveChanges();
            }
        }

        // Deleta um Usuario
        public void Deletar(Usuarios usuario)
        {
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                ctx.Usuarios.Remove(usuario);
                ctx.SaveChanges();
            }
        }

        // Lista todos os Usuários
        public List<Usuarios> Listar()
        {
            List<Usuarios> usuarios = new List<Usuarios>();
            
            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                usuarios = ctx.Usuarios.ToList();
            }

            return usuarios;
        }

        // Lista todos os Usuários e seus correspondentes donos(Pacientes, Medicos ou Admin)
        public List<Usuarios> ListarUserPacMedCorr()
        {
            List<Usuarios> usuarios = new List<Usuarios>();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                usuarios = ctx.Usuarios.Include("Prontuarios").Include("Medicos").ToList();
            }

            return usuarios;
        }

        // Efetua o login do usuário
        public Usuarios Logar(LoginViewModel login)
        {
            Usuarios usuarioLogado = new Usuarios();

            using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
            {
                usuarioLogado = ctx.Usuarios.ToList().Find(u => u.Email == login.Email && u.Senha == login.Senha);
            }

            return usuarioLogado;
        }
    }
}

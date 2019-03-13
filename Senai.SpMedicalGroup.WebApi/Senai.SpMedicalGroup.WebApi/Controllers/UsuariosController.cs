using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositorios;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Authorize(Roles = "1")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuariosRepositorio UsuariosRepositorio { get; set; }

        public UsuariosController()
        {
            UsuariosRepositorio = new UsuariosRepositorio();
        }

        // Lista todos os Usuarios
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                //Lista apenas os campos Id, Email e Tipo dos Usuários

                //using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                //{
                //    return Ok(ctx.Usuarios.Select(x => new { x.Id, x.Email, x.IdTipoUsuario }).ToList());
                //}

                return Ok(UsuariosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista um único Usuario especifico
        [HttpGet("/BuscarUsuario/{usuarioId}")]
        public IActionResult GetUsuario(int usuarioId)
        {
            try
            {
                Usuarios usuarioBuscado = UsuariosRepositorio.BuscarUsuario(usuarioId);

                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = "Usuário não encontrada!" });
                }

                return Ok(usuarioBuscado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista os Usuários e seus Pacientes ou Médicos correspondentes
        [HttpGet("/UsuariosPacientesMedicos")]
        public IActionResult GetUserPacMedCorr()
        {
            try
            {
                return Ok(UsuariosRepositorio.ListarUserPacMedCorr());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Cadastra um novo Usuário
        [HttpPost]
        public IActionResult Post(Usuarios usuarioRecebido)
        {
            try
            {
                UsuariosRepositorio.Cadastrar(usuarioRecebido);

                return Ok(usuarioRecebido);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Altera os dados de um Usuário
        [HttpPut]
        public IActionResult Put(Usuarios usuarioRecebido)
        {
            try
            {
                Usuarios usuarioBuscado = UsuariosRepositorio.BuscarUsuario(usuarioRecebido.Id);

                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = "Usuário não encotrado!" });
                }

                UsuariosRepositorio.Alterar(usuarioRecebido);

                return Ok(usuarioRecebido);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Deleta um Usuario
        [HttpDelete("{usuarioId}")]
        public IActionResult Delete(int usuarioId)
        {
            try
            {
                Usuarios usuarioBuscado = UsuariosRepositorio.BuscarUsuario(usuarioId);

                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = "Usuario não encontrada!" });
                }

                UsuariosRepositorio.Deletar(usuarioBuscado);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
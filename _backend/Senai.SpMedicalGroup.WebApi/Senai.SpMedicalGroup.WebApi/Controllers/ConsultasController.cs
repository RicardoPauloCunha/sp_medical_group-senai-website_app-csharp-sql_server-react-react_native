using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositorios;
using Senai.SpMedicalGroup.WebApi.ViewModel;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultasRepositorio ConsultasRepositorio { get; set; }

        public ConsultasController()
        {
            ConsultasRepositorio = new ConsultasRepositorio();
        }

        // Listar todas as Consultas
        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(ConsultasRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // retorna a quantidade de Consultas cadastradas
        [HttpGet("Count")]
        public IActionResult GetCount()
        {
            try
            {
                List<Consultas> consultas = ConsultasRepositorio.Listar();

                int usuariosQtd = consultas.Count();

                return Ok(usuariosQtd);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Cadastra uma nova Consulta
        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Consultas consultaRecebida)
        {
            try
            {
                ConsultasRepositorio.Cadastrar(consultaRecebida);

                return Ok(consultaRecebida);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Atualiza uma Consulta
        [Authorize(Roles = "1")]
        [HttpPut]
        public IActionResult Put(Consultas consultaRecebida)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.BuscarConsulta(consultaRecebida.Id);

                if (consultaBuscada == null)
                {
                    return NotFound(new { mensagem = "Consulta não encontrada!" });
                }

                ConsultasRepositorio.Alterar(consultaRecebida);

                return Ok(consultaRecebida);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Atualiza a descrição do Prontuario
        [Authorize(Roles = "2")]
        [HttpPut("/AlterarDescricaoConsulta")]
        public IActionResult AlterarDescricaoConsulta(Consultas descricaoRecebida)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.BuscarConsulta(descricaoRecebida.Id);

                if (consultaBuscada == null)
                {
                    return NotFound(new { mensagem = "Consulta não encontrada!" });
                }

                Consultas consultaAlterada = ConsultasRepositorio.AlterarDecricaoPaciente(descricaoRecebida, consultaBuscada);

                return Ok(consultaAlterada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Alterar situação da consulta
        [Authorize(Roles = "1, 2")]
        [HttpPut("/AlterarSituacaoConsulta")]
        public IActionResult AlterarSituacaoConsulta(Consultas situacaoRecebida)
        {
            try
            {
                // Verfica se consulta existe
                Consultas consultaBuscada = ConsultasRepositorio.BuscarConsulta(situacaoRecebida.Id);

                if (consultaBuscada == null)
                {
                    return NotFound(new { mensagem = "Consulta não encontrada!" });
                }

                // Busca pelo usuario logado
                int usuarioLog = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (situacaoRecebida.IdSituacao == 3 && usuarioLog != 1)
                {
                    return NotFound(new { mensagem = "Você não possui autorização para cancelar essa Consulta." });
                }

                // Alterar a situacao
                Consultas consultaAlterada = ConsultasRepositorio.AlterarSituacaoPaciente(situacaoRecebida, consultaBuscada);

                return Ok(consultaAlterada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Deleta uma Consulta
        [Authorize(Roles = "1")]
        [HttpDelete("{consultaId}")]
        public IActionResult Delete(int consultaId)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.BuscarConsulta(consultaId);

                if (consultaBuscada == null)
                {
                    return NotFound(new { mensagem = "Consulta não encontrada!"});
                }

                ConsultasRepositorio.Deletar(consultaBuscada);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "1")]
        // Lista uma Consulta especifica
        [HttpGet("{consultaId}")]
        public IActionResult GetConsulta(int consultaId)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.BuscarConsulta(consultaId);

                if (consultaBuscada == null)
                {
                    return NotFound(new { mensagem = "Consulta não encontrada!" });
                }

                return Ok(consultaBuscada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista todas as Consultas referentes a um usuario
        [Authorize(Roles = "2, 3")]
        [HttpGet("/BuscarConsultasDeUsuario")]
        public IActionResult GetConsultasUsuario()
        {
            try
            {
                MedicosRepositorio medicoRep = new MedicosRepositorio();
                ProntuariosRepositorio prontuarioRep = new ProntuariosRepositorio();

                // Pega o Usuario Logado
                int usuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                int usuarioTipo = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == "UsuarioTipo").Value);

                List<Consultas> consultasUsuarios = new List<Consultas>();

                // Procura pelo usuario
                if (usuarioTipo == 1)
                {
                    return NotFound(new { mensagem = "O usuriário Administrador não possui consultas agendadas" });
                }
                else if (usuarioTipo == 2)
                {
                    Medicos medicoLog = medicoRep.medicoLogado(usuarioId);
                    consultasUsuarios = ConsultasRepositorio.BuscarConsultasDeUsuario(usuarioTipo, medicoLog.Id);
                }
                else if (usuarioTipo == 3)
                {
                    Prontuarios pacienteLog = prontuarioRep.pacienteLogado(usuarioId);
                    consultasUsuarios = ConsultasRepositorio.BuscarConsultasDeUsuario(usuarioTipo, pacienteLog.Id);
                }
                else
                {
                    return NotFound(new { mensagem = "Usuario não encotrado!" });
                }
                
                // verifica a lista de consultas
                if (consultasUsuarios == null)
                {
                    return NotFound(new { mensagem = "Não foram encotradas consultas referentes a esse Usuario." });
                }
                else if (consultasUsuarios.Count() == 0)
                {
                    return Ok(new { mensagem = "Usuario não possui nenhuma consulta agendada." });
                }

                // retorna as conultas do medico
                return Ok(consultasUsuarios);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
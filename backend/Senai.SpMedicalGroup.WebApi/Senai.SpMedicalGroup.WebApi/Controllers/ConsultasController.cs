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
        [Authorize(Roles = "1, 2")]
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
        [HttpGet("/BuscarConsultas/{consultaId}")]
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

        [Authorize(Roles = "2")]
        // Lista todas as Consultas referentes a um médico
        [HttpGet("/BuscarConsultasDeMedico")]
        public IActionResult GetConsultasDeMedico()
        {
            try
            {
                MedicosRepositorio medicoRep = new MedicosRepositorio();

                // Pega o Usuario Logado
                int medicoId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                Medicos medicoLog = medicoRep.medicoLogado(medicoId);

                if (medicoLog == null)
                {
                    return NotFound(new { mensagem = "Medico não encotrado!" });
                }

                // Procura todas as consultas do medico
                List<Consultas> consultasMedico = ConsultasRepositorio.BuscarConsultasDeMedico(medicoLog.Id);
                
                if (consultasMedico == null)
                {
                    return NotFound(new { mensagem = "Não foram encotradas consultas referentes a esse medico." });
                }
                else if (consultasMedico.Count() == 0)
                {
                    return Ok(new { mensagem = "Medico não possui nenhuma consulta agendada." });
                }

                // retorna as conultas do medico
                return Ok(consultasMedico);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "3")]
        // Listar todas as Consultas referentes a um paciente
        [HttpGet("/BuscarConsultasDePaciente")]
        public IActionResult GetConsultasDePaciente()
        {
            try
            {
                ProntuariosRepositorio prontuarioRep = new ProntuariosRepositorio();

                // Pega usuario logado
                int prontuarioId = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                Prontuarios pacienteLog = prontuarioRep.pacienteLogado(prontuarioId);

                if (pacienteLog == null)
                {
                    return NotFound(new { mensagem = "Paciente não encontrado"});
                }

                // Procura todas as consultas do paciente
                List<Consultas> consultasPaciente = ConsultasRepositorio.BuscarConsultasDePaciente(pacienteLog.Id);

                if (consultasPaciente == null)
                {
                    return NotFound(new { mensagem = "Não foram encotradas consultas referentes a esse paciente." });
                }
                else if (consultasPaciente.Count() == 0)
                {
                    return Ok(new { mensagem = "Paciente não possui nenhuma consulta agendada." });
                }

                return Ok(consultasPaciente);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
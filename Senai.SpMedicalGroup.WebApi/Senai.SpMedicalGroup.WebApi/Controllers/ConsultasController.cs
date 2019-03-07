using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositorios;

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

        // Cadastra uma Consulta
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
        [HttpPut]
        public IActionResult Put(Consultas consultaRecebida)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.Listar().Find(c => c.Id == consultaRecebida.Id);

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
        [HttpDelete("{consultaId}")]
        public IActionResult Delete(int consultaId)
        {
            try
            {
                Consultas consultaBuscada = ConsultasRepositorio.Listar().Find(c => c.Id == consultaId);

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

        // Lista uma Consulta especifica
        [HttpGet("BuscarConsulta/{consultaId}")]
        public IActionResult GetConsulta(int consultaId)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista todas as Consultas correspondentes a um médico
        [HttpGet("BuscarConsultasDeMedico/{medicoId}")]
        public IActionResult GetConsultasDeMedico(int medicoId)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Listar todas as Consultas correspondentes a um paciente
        [HttpGet("BuscarConsultasDePaciente/{pacienteId}")]
        public IActionResult GetConsultasDePaciente(int pacienteId)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
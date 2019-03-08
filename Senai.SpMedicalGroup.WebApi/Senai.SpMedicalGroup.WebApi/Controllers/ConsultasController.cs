﻿using System;
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

        // Cadastra uma nova Consulta
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

        // Lista todas as Consultas referentes a um médico
        [HttpGet("/BuscarConsultasDeMedico/{medicoId}")]
        public IActionResult GetConsultasDeMedico(int medicoId)
        {
            try
            {
                List<Consultas> consultasMedico = ConsultasRepositorio.BuscarConsultasDeMedico(medicoId);

                if (consultasMedico == null)
                {
                    return NotFound(new { mensagem = "Não foram encotradas consultas referentes a esse medico." });
                }
                else if (consultasMedico.Count() == 0)
                {
                    return Ok(new { mensagem = "Medico não possui nenhuma consulta agendada." });
                }

                return Ok(consultasMedico);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Listar todas as Consultas referentes a um paciente
        [HttpGet("/BuscarConsultasDePaciente/{prontuariosId}")]
        public IActionResult GetConsultasDePaciente(int prontuariosId)
        {
            try
            {
                List<Consultas> consultasPaciente = ConsultasRepositorio.BuscarConsultasDePaciente(prontuariosId);

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
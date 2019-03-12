using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositorios;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Authorize(Roles = "1")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicasRepositorio ClinicasRepositorio { get; set; }
        
        public ClinicasController()
        {
            ClinicasRepositorio = new ClinicasRepositorio();
        }

        // Lista todas as Clinicas
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(ClinicasRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Busca uma unica Clinica
        [HttpGet("{clinicaId}")]
        public IActionResult Get(int clinicaId)
        {
            try
            {
                Clinicas clinicaBuscada = ClinicasRepositorio.BuscarClinica(clinicaId);

                if (clinicaBuscada == null)
                {
                    return NotFound(new { mensagem = "Clinica não encontrada!" });
                }

                return Ok(clinicaBuscada);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Cadastra uma Clinica
        [HttpPost]
        public IActionResult Post(Clinicas clinicaRecebida)
        {
            try
            {
                ClinicasRepositorio.Cadastrar(clinicaRecebida);
                return Ok(clinicaRecebida);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Atualiza uma Clinica
        [HttpPut]
        public IActionResult Put(Clinicas clinicaRecebida)
        {
            try
            {
                Clinicas clinicaBuscada = ClinicasRepositorio.BuscarClinica(clinicaRecebida.Id);

                if (clinicaBuscada == null)
                {
                    return NotFound(new { mensagem = "Clinica não encontrada!" });
                }

                ClinicasRepositorio.Alterar(clinicaRecebida);

                return Ok(clinicaRecebida);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Deleta uma Clinica
        [HttpDelete("{clinicaId}")]
        public IActionResult Delete(int clinicaId)
        {
            try
            {
                Clinicas clinicaBuscada = ClinicasRepositorio.BuscarClinica(clinicaId);

                if (clinicaBuscada == null)
                {
                    return NotFound(new { mensagem = "Clinica não encontrada!" });
                }

                ClinicasRepositorio.Deletar(clinicaBuscada);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
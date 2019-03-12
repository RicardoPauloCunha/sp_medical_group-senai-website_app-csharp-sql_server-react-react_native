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
    public class MedicosController : ControllerBase
    {
        private IMedicosRepositorio MedicosRepositorio { get; set; }

        public MedicosController()
        {
            MedicosRepositorio = new MedicosRepositorio();
        }

        // Lista todos os Medicos
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(MedicosRepositorio.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista um Medico especifico
        [HttpGet("{medicoId}")]
        public IActionResult Get(int medicoId)
        {
            try
            {
                Medicos medicoBuscado = MedicosRepositorio.BuscarMedico(medicoId);

                if (medicoBuscado == null)
                {
                    return NotFound(new { mensagem = "Medico não encotrado!" });
                }

                return Ok(medicoBuscado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Cadastrar um novo medico
        [HttpPost]
        public IActionResult Post(Medicos medicoRecebido)
        {
            try
            {
                MedicosRepositorio.Cadastrar(medicoRecebido);

                return Ok(medicoRecebido);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Altera um medico
        [HttpPut]
        public IActionResult Put(Medicos medicoRecebido)
        {
            try
            {
                Medicos medicoBuscado = MedicosRepositorio.BuscarMedico(medicoRecebido.Id);

                if (medicoBuscado == null)
                {
                    return NotFound(new { mensagem = "Medico não encontrado" });
                }

                MedicosRepositorio.Alterar(medicoRecebido);

                return Ok(medicoRecebido);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Deleta um Medico
        [HttpDelete("{medicoId}")]
        public IActionResult Delete(int medicoId)
        {
            try
            {
                Medicos medicoBuscado = MedicosRepositorio.BuscarMedico(medicoId);

                if (medicoBuscado == null)
                {
                    return NotFound(new { mensagem = "Medico não encontrada!" });
                }

                MedicosRepositorio.Deletar(medicoBuscado);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
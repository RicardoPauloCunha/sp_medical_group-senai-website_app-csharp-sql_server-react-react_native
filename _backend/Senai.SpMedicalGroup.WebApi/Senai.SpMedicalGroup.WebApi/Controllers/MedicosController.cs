﻿using System;
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

        // Lista Medicos com Especialidade, Usuario, Clinica
        [HttpGet("MedicosInclude")]
        public IActionResult GetUsuariosInclude()
        {
            try
            {
                return Ok(MedicosRepositorio.ListarMedicosInclude());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // Lista todos os Medicos com somente o id e o nome
        [HttpGet("SelectMedicos")]
        public IActionResult GetMedicos()
        {
            try
            {
                using (SpMedicalGroupContext ctx = new SpMedicalGroupContext())
                {
                    return Ok(ctx.Medicos.Select(x => new { x.Id, x.Nome}).ToList());
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // retorna a quantidade de Medicos cadastradas
        [HttpGet("Count")]
        public IActionResult GetCount()
        {
            try
            {
                List<Medicos> medicos = MedicosRepositorio.Listar();

                return Ok(medicos.Count());
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

        // Lista todas as especilidade de medicos
        [HttpGet("SelectEspecialidades")]
        public IActionResult GetEspecilidades()
        {
            try
            {
                return Ok(MedicosRepositorio.ListarEspecialidades());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
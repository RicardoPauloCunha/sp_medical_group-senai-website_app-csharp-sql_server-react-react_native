using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositorios;
using Senai.SpMedicalGroup.WebApi.ViewModel;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuariosRepositorio UsuariosRepositorio { get; set; }

        public LoginController()
        {
            UsuariosRepositorio = new UsuariosRepositorio();
        }

        [HttpPost]
        public IActionResult Post(LoginViewModel loginRecebido)
        {
            try
            {
                Usuarios usuarioLogado = UsuariosRepositorio.Logar(loginRecebido);

                if (usuarioLogado == null)
                {
                    return NotFound(new { mensagem = "Usuario não encontrado! Email ou Senha incorretos." });
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioLogado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioLogado.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuarioLogado.IdTipoUsuario.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("spmedicalgroup-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken
                (
                    issuer: "SpMedicalGroup.WebApi",
                    audience: "SpMedicalGroup.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds
                );

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
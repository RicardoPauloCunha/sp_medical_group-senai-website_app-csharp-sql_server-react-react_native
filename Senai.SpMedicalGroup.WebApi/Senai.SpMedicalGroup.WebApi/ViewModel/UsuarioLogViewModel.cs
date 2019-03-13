using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.ViewModel
{
    public class UsuarioLogViewModel
    {
        private readonly IHttpContextAccessor _accessor;

        public UsuarioLogViewModel(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string Email => _accessor.HttpContext.User.Identity.Name;
        public string Name => GetClaimsIdentity().FirstOrDefault(a => a.Type == ClaimTypes.NameIdentifier)?.Value;

        public IEnumerable<Claim> GetClaimsIdentity()
        {
            return _accessor.HttpContext.User.Claims;
        }

        public string RetornaEmailUsuarioLog()
        {
            return Email;
        }
    }
}

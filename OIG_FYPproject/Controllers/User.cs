using Infrastructure.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OIG_FYPproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private Iuser _user;
        public User(Iuser user)
        {
            _user = user;
        }
        [HttpPost("login")]
        public void add([FromBody] temp obj) {
            bool x = _user.login();
            x = x;
        }
    }
}

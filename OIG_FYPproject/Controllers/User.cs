using Infrastructure.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        public user_entity loginUser([FromBody] user_entity obj) {
            string role = _user.login(obj);
            obj.password="";
            obj.userName = role;
            return obj;
        }
        [HttpPost("register")]
        public bool addUser([FromBody] user_entity obj)
        {
            bool x = _user.register(obj);
            return x;
        }
        [HttpGet("getInvestors")]
        public List<user_entity> getInvestors() {
            List<user_entity> list = new List<user_entity>();
            list = _user.getInvestors();
            return list;
        }
        [HttpGet("getInvestors")]
        public List<user_entity> getAdvisors()
        {
            List<user_entity> list = new List<user_entity>();
            list = _user.getInvestors().ToList();
            return list;
        }
    }
}

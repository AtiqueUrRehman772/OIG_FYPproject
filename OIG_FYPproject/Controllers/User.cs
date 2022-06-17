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
        private static user_entity Id;
        private static DateTime starttime;
        public User(Iuser user)
        {
            _user = user;
        }
        [HttpPost("login")]
        public user_entity loginUser([FromBody] user_entity obj) {
            starttime = DateTime.Now;
            Id = obj;
            string role = _user.login(obj);
            obj.password="";
            obj.userName = role;
            return obj;
        }
        [HttpPost("register")]
        public user_entity addUser([FromBody] user_entity obj)
        {
            user_entity x = _user.register(obj);
            return x;
        }
        [HttpGet("getUserCount")]
        public user_entity getUserCount()
        {
            user_entity obj = new user_entity();
            obj = _user.getUserCount();
            return obj;
        }
        [HttpGet("getTime")]
        public user_entity getTime()
        {
            string temp = (DateTime.Now-starttime).ToString(@"hh\:mm\:ss");
            //int time = int.Parse(temp);
            user_entity obj = new user_entity();
            obj.email = temp.ToString();
            return obj;
        }
        [HttpGet("getUserId")]
        public user_entity getUserId()
        {
            return Id;
        }
        [HttpGet("getAllUsers")]
        public List<user_entity> getAllUsers()
        {
            List<user_entity> list = _user.getAllUsers();
            return list;
        }
        [HttpGet("getInvestors")]
        public List<user_entity> getInvestors() {
            List<user_entity> list = _user.getInvestors();
            return list;
        }
        [HttpGet("getAdvisors")]
        public List<user_entity> getAdvisors()
        {
            List<user_entity> list = _user.getAdvisors();
            return list;
        }
        //////////  ======   For Investor Homepage   ======  /////////
        [HttpGet("getAllAdvisors")]
        public List<advisor> getAllAdvisors()
        {
            List<advisor> list = _user.getAllAdvisors(Id.email);
            return list;
        }
        [HttpGet("getMyAdvisors")]
        public List<advisor> getMyAdvisors()
        {
            List<advisor> list = _user.getMyAdvisors(Id.email);
            return list;
        }
        [HttpPost("deleteUser")]
        public bool deleteUser([FromBody] user_entity obj)
        {
            bool response = _user.deleteUser(obj);
            return response;
        }
        [HttpPost("editUserDetails")]
        public bool editUserDetails([FromBody] user_entity obj)
        {
            bool response = _user.editUserDetails(obj);
            return response;
        }

        //////////  ======   For Advisor Homepage   ======  /////////
        [HttpGet("getProfile")]
        public user_entity getAdvisorProfile()
        {
            user_entity obj = _user.getAdvisorProfile(Id.email);
            return obj;
        }
        [HttpPost("editProfile")]
        public bool editProfile([FromBody] user_entity obj)
        {
            bool response = _user.editProfile(obj);
            return response;
        }
        [HttpGet("getInvestorProfile")]
        public user_entity getInvestorProfile()
        {
            user_entity obj = _user.getInvestorProfile(Id.email);
            return obj;
        }

        [HttpPost("revealInvestors")]
        public List<user_entity> revealInvestors([FromBody] user_entity obj)
        {
            List<user_entity> response = _user.revealInvestors(obj,Id.email);
            return response;
        }
        [HttpPost("getAdvisorInfo")]
        public user_entity getAdvisorInfo([FromBody] user_entity obj)
        {
            user_entity x = _user.getAdvisorInfo(obj);
            return x;
        }
    }
}

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
    public class Requests : ControllerBase
    {
        private IRequest _request;
        public Requests(IRequest request)
        {
            _request = request;
        }
        [HttpGet("getInvestorRequests")]
        public List<request_entity> getInvestorRequests()
        {
            List<request_entity> list = new List<request_entity>();
            list = _request.getInvestorRequests();
            return list;
        }
    }
}

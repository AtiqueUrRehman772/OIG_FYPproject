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
        [HttpGet("getRequestCount")]
        public user_entity getRequestCount()
        {
            user_entity obj = new user_entity();
            obj = _request.getRequestCount();
            return obj;
        }
        [HttpGet("getAccCount")]
        public user_entity getAccCount()
        {
            user_entity obj = _request.getAccCount();
            return obj;
        }
        [HttpGet("getDecCount")]
        public user_entity getDecCount()
        {
            user_entity obj = _request.getDecCount();
            return obj;
        }
        [HttpGet("getInvestorRequests")]
        public List<request_entity> getInvestorRequests()
        {
            List<request_entity> list = new List<request_entity>();
            list = _request.getInvestorRequests();
            return list;
        }
        [HttpGet("getAdvisorRequests")]
        public List<request_entity> getAdvisorRequests()
        {
            List<request_entity> list = new List<request_entity>();
            list = _request.getAdvisorRequests();
            return list;
        }
        [HttpGet("getOwnerRequests")]
        public List<request_entity> getOwnerRequests()
        {
            List<request_entity> list = new List<request_entity>();
            list = _request.getOwnerRequests();
            return list;
        }
        [HttpGet("getAllRequests")]
        public List<request_entity> getAllRequests()
        {
            List<request_entity> list = _request.getAllRequests();
            return list;
        }

        /////////   Advisor HomePage    ///////////////

        [HttpPost("getHiringRequests")]
        public List<request_entity> getHiringRequests(request_entity reqId)
        {
            List<request_entity> list = _request.getHiringRequests(reqId);
            return list;
        }
        [HttpPost("getRequestsHistory")]
        public List<request_entity> getRequestsHistory(request_entity reqId)
        {
            List<request_entity> list = _request.getRequestsHistory(reqId);
            return list;
        }

        ////////////    CRUD Operations   /////////////
        [HttpPost("declineRequest")]
        public void declineRequest(request_entity reqId)
        {
            _request.declineRequest(reqId);
        }
        [HttpPost("acceptRequest")]
        public void acceptRequest(request_entity reqId)
        {
            _request.acceptRequest(reqId);
        }
        [HttpPost("acceptHiringRequest")]
        public bool acceptHiringRequest(request_entity reqId)
        {
            bool response = _request.acceptHiringRequest(reqId);
            return response;
        }
        [HttpPost("rejectHiringRequest")]
        public bool rejectHiringRequest(request_entity reqId)
        {
            bool response = _request.rejectHiringRequest(reqId);
            return response;
        }

        [HttpPost("getInvestmentRequests")]
        public List<request_entity> getInvestmentRequests(request_entity reqId)
        {
            List<request_entity> obj = _request.getInvestmentRequests(reqId);
            return obj;
        }
        [HttpPost("getInvestmentRequestsHistory")]
        public List<request_entity> getInvestmentRequestsHistory(request_entity reqId)
        {
            List<request_entity> obj = _request.getInvestmentRequestsHistory(reqId);
            return obj;
        }
        [HttpPost("acceptInvestmentRequest")]
        public bool acceptInvestmentRequest(request_entity reqId)
        {
            bool obj = _request.acceptInvestmentRequest(reqId);
            return obj;
        }
        [HttpPost("declineInvestmentRequest")]
        public bool declineInvestmentRequest(request_entity reqId)
        {
            bool obj = _request.declineInvestmentRequest(reqId);
            return obj;
        }
    }
}

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
    public class Business : ControllerBase
    {
        private Ibusiness _business;
        public Business(Ibusiness business)
        {
            _business = business;
        }
        /////////////       Business Related Functions     ////////////////
        [HttpPost("addNewBusiness")]
        public bool addNewBusiness(business_entity obj)
        {
            bool response = _business.addNewBusiness(obj);
            return response;
        }
        [HttpPost("markComplete")]
        public bool markComplete(business_entity obj)
        {
            bool response = _business.markComplete(obj);
            return response;
        }
        [HttpGet("getAvailableBusiness")]
        public List<business_entity> getAvailableBusiness()
        {
            List<business_entity> list = _business.getAvailableBusiness();
            return list;
        }
        [HttpPost("getBusiness")]
        public List<business_entity> getBusiness(business_entity bCat)
        {
            List<business_entity> list = _business.getBusiness(bCat);
            return list;
        }
        [HttpPost("getMyBusinesses")]
        public List<business_entity> getMyBusinesses(business_entity obj)
        {
            List<business_entity> list = _business.getMyBusinesses(obj);
            return list;
        }
        [HttpPost("getClosedBusiness")]
        public List<business_entity> getClosedBusiness(business_entity obj)
        {
            List<business_entity> list = _business.getClosedBusiness(obj);
            return list;
        }
        [HttpPost("getAdvisorBusiness")]
        public List<business_entity> getAdvisorBusiness(business_entity obj)
        {
            List<business_entity> list = _business.getAdvisorBusiness(obj);
            return list;
        }
        [HttpPost("getFilteredBusiness")]
        public List<business_entity> getFilteredBusiness(business_entity obj)
        {
            List<business_entity> list = _business.getFilteredBusiness(obj);
            return list;
        }
        [HttpPost("getAssociatedAdvisors")]
        public List<user_entity> getAssociatedAdvisors(business_entity obj)
        {
            List<user_entity> list = _business.getAssociatedAdvisors(obj);
            return list;
        }
        [HttpPost("hireAdvisor")]
        public bool hireAdvisor(business_entity obj)
        {
            bool result = _business.hireAdvisor(obj);
            return result;
        }
        [HttpPost("myDeals")]
        public List<business_entity> myDeals(business_entity obj)
        {
            List<business_entity> result = _business.myDeals(obj);
            return result;
        }
        [HttpPost("makeADeal")]
        public void makeADeal(business_entity obj)
        {
            _business.makeADeal(obj);
        }
        [HttpPost("getBusinessInfo")]
        public business_entity getBusinessInfo(business_entity obj)
        {
            business_entity result = _business.getBusinessInfo(obj);
            return result;
        }
        [HttpPost("rateRisk")]
        public bool rateRisk(business_entity obj)
        {
            bool result = _business.rateRisk(obj);
            return result;
        }
    }
}

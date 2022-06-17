using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interface
{
    public interface Ibusiness
    {
        public bool addNewBusiness(business_entity obj);
        public bool markComplete(business_entity obj);
        public List<business_entity> getAvailableBusiness();
        public List<business_entity> getMyBusinesses(business_entity obj);
        public List<business_entity> getClosedBusiness(business_entity obj);
        public List<business_entity> getAdvisorBusiness(business_entity obj);
        public List<business_entity> getBusiness(business_entity bCat);
        public List<business_entity> getFilteredBusiness(business_entity obj);
        public List<user_entity> getAssociatedAdvisors(business_entity obj);
        public List<business_entity> myDeals(business_entity obj);
        public business_entity getBusinessInfo(business_entity obj);
        public bool rateRisk(business_entity obj);
        public bool hireAdvisor(business_entity obj);
        public void makeADeal(business_entity obj);
    }
}

using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interface
{
    public interface Iuser
    {
        public string login(user_entity obj);
        public bool register(user_entity obj);
        public bool deleteUser(user_entity obj);
        public bool editUserDetails(user_entity obj);
        public user_entity getUserCount();
        public user_entity getAdvisorProfile(string Id);
        public user_entity getInvestorProfile(string Id);
        public List<user_entity> getInvestors();
        public List<user_entity> getAllUsers();
        public List<user_entity> getAdvisors();
        //////////  ======   For Investor Homepage   ======  /////////
        public bool editProfile(user_entity obj);



        //////////  ======   For Investor Homepage   ======  /////////
        public List<advisor> getAllAdvisors();
    }
}

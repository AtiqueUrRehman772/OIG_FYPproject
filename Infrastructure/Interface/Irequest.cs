using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interface
{
    public interface IRequest
    {
        public user_entity getRequestCount();
        public user_entity getAccCount();
        public user_entity getDecCount();
        public List<request_entity> getInvestorRequests();
        public List<request_entity> getAdvisorRequests();
        public List<request_entity> getOwnerRequests();
        public List<request_entity> getAllRequests();
        public List<request_entity> getHiringRequests(request_entity reqId);
        public List<request_entity> getRequestsHistory(request_entity reqId);
        
        //////////     CRUD Operations Prototype    ///////////
        public void declineRequest(request_entity reqId);
        public void acceptRequest(request_entity reqId);
        public bool acceptHiringRequest(request_entity reqId);
        public bool rejectHiringRequest(request_entity reqId);
        public List<request_entity> getInvestmentRequests(request_entity reqId);
        public List<request_entity> getInvestmentRequestsHistory(request_entity reqId);
        public bool acceptInvestmentRequest(request_entity reqId);
        public bool declineInvestmentRequest(request_entity reqId);
    }
}

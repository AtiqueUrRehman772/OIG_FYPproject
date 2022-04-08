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
        public List<request_entity> getInvestorRequests();
    }
}

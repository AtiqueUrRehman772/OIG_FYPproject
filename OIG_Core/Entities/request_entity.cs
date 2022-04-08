using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OIG_Core.Entities
{
    public class request_entity
    {
        public string userName { get; set; }
        public string userEmail { get; set; }
        public string userPassword { get; set; }
        public string userRole { get; set; }
        public string requestStatus { get; set; }
    }
}

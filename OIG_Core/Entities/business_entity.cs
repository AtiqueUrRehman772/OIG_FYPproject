using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OIG_Core.Entities
{
    public class business_entity
    {
        public string bId { get; set; }
        public string bName { get; set; }
        public string bOwner { get; set; }
        public string bCategory { get; set; }
        public string registeredOn { get; set; }
        public string riskFactor { get; set; }
        public string address { get; set; }
        public string ECD { get; set; }
        public string investedAmount { get; set; }
        public string progress { get; set; }
        public string status { get; set; }
    }
}

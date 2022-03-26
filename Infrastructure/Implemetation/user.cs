using Infrastructure.Interface;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Implemetation
{
    public class user:Iuser 
    {
        private IConfiguration Configuration;
        private readonly string connString;
        public user(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connString = this.Configuration.GetConnectionString("db_connect");
        }
        public bool login() {
            return true;
        }

    }
}

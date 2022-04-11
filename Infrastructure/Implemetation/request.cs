using Infrastructure.Interface;
using Microsoft.Extensions.Configuration;
using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Implemetation
{
    public class Request : IRequest
    {
        private IConfiguration Configuration;
        private readonly string connString;
        public Request(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connString = this.Configuration.GetConnectionString("db_connect");
        }
        public List<request_entity> getInvestorRequests()
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "select * from tbl_Users where Email = '"+obj.email+"' and Password = '"+obj.password+"'";
                string query = "getInvestorRequests";
                SqlCommand com = new SqlCommand(query, con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new request_entity();
                    obj.userName = sdr["UserName"].ToString();
                    obj.userEmail = sdr["UserEmail"].ToString();
                    obj.userPassword = sdr["UserPassword"].ToString();
                    obj.userRole = sdr["UserRole"].ToString();
                    obj.requestStatus = sdr["RequestStatus"].ToString();
                    list.Add(obj);
                }
                con.Close();
                return list;
            }
            catch (Exception e)
            {
                return list;
                throw;
            }
        }
    }
}

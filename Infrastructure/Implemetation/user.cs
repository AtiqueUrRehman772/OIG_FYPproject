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
    public class user : Iuser
    {
        private IConfiguration Configuration;
        private readonly string connString;
        public user(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connString = this.Configuration.GetConnectionString("db_connect");
        }
        public string login(user_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "select * from tbl_Users where Email = '"+obj.email+"' and Password = '"+obj.password+"'";
                string query = "userLogin";
                SqlCommand com = new SqlCommand(query, con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("email", obj.email);
                com.Parameters.AddWithValue("password", obj.password);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    string role;
                    role = sdr["Role"].ToString();
                    con.Close();
                    return role;
                }
                con.Close();
                return "Invalid Login";
            }
            catch (Exception e)
            {
                return "Unknown Error";
                throw;
            }
        }
        public bool register(user_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "select * from tbl_Users where Email = '"+obj.email+"' and Password = '"+obj.password+"'";
                string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("userName", obj.userName);
                com.Parameters.AddWithValue("email", obj.email);
                com.Parameters.AddWithValue("password", obj.password);
                com.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }

    }
}

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
                    role = role.ToLower();
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
                if (obj.role == "Bussiness Owner")
                    obj.role = "owner";
                //string query = "select * from tbl_Users where Email = '"+obj.email+"' and Password = '"+obj.password+"'";
                string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("userName", obj.userName);
                com.Parameters.AddWithValue("email", obj.email);
                com.Parameters.AddWithValue("password", obj.password);
                com.Parameters.AddWithValue("role", obj.role);
                com.Parameters.AddWithValue("country", obj.country);
                com.ExecuteNonQuery();
                con.Close();
                if (obj.role == "Advisor")
                {
                    con.Open();
                    query = "insert into tbl_Advisors values('" + obj.userName + "','" + obj.email + "','"+ obj.password + "','','"+DateTime.Now.ToString()+"',0,'','','','Inactive','"+obj.country + "')";
                    com = new SqlCommand(query, con);
                    com.ExecuteNonQuery();
                    con.Close();
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
                throw;
            }
        }
        public user_entity getUserCount()
        {
            user_entity obj = new user_entity();
            try
            {
                int count = 0;
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Users";
                //string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    count++;
                }
                obj.email = count.ToString();
                con.Close();
                return obj;
            }
            catch (Exception e)
            {
                return obj;
                throw;
            }
        }
        public List<user_entity> getAllUsers()
        {
            List<user_entity> list = new List<user_entity>();
            user_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "getAllUsers";
                SqlCommand com = new SqlCommand(query, con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new user_entity();
                    obj.userName = sdr["User_Name"].ToString();
                    obj.email = sdr["Email"].ToString();
                    obj.password = sdr["Password"].ToString();
                    obj.role = sdr["Role"].ToString();
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
        public List<user_entity> getInvestors()
        {
            List<user_entity> list = new List<user_entity>();
            user_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "getInvestors";
                string query = "select * from tbl_Users where Role = 'investor'";
                SqlCommand com = new SqlCommand(query, con);
                //com.CommandType = CommandType.StoredProcedure;
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new user_entity();
                    obj.userName = sdr["User_Name"].ToString();
                    obj.email = sdr["Email"].ToString();
                    obj.password = sdr["Password"].ToString();
                    obj.role = sdr["Role"].ToString();
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
        public List<user_entity> getAdvisors()
        {
            List<user_entity> list = new List<user_entity>();
            user_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "getInvestors";
                string query = "select * from tbl_Users where Role = 'advisor'";
                SqlCommand com = new SqlCommand(query, con);
                //com.CommandType = CommandType.StoredProcedure;
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new user_entity();
                    obj.userName = sdr["User_Name"].ToString();
                    obj.email = sdr["Email"].ToString();
                    obj.password = sdr["Password"].ToString();
                    obj.role = sdr["Role"].ToString();
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

        //////////  ======   For Investor Homepage   ======  /////////
        public List<advisor> getAllAdvisors()
        {
            List<advisor> list = new List<advisor>();
            advisor obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "getInvestors";
                string query = "select * from tbl_Advisors";
                SqlCommand com = new SqlCommand(query, con);
                //com.CommandType = CommandType.StoredProcedure;
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new advisor();
                    obj.advisorId = sdr["advisorId"].ToString();
                    obj.userName = sdr["UserName"].ToString();
                    obj.userEmail = sdr["UserEmail"].ToString();
                    obj.userPassword = sdr["UserPassword"].ToString();
                    //obj.regiesteredIn = sdr["RegiesteredIn"].ToString();
                    obj.firmName = sdr["FirmName"].ToString();
                    obj.rating = sdr["Rating"].ToString();
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

        //////////  ======   For Admin   ======  /////////
        public bool deleteUser(user_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "delete from tbl_Users where Email = '" + obj.email + "'";
                //string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
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
        public bool editUserDetails(user_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Users set User_Name = '" + obj.userName + "',Password = '" + obj.password + "'  where Email = '" + obj.email + "'";
                //string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
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



        /////////   ======   For Advisor HomePage  =====  ////////////
        public user_entity getAdvisorProfile(string Id)
        {
            user_entity obj = new user_entity();
            //return obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Advisors where UserEmail = '"+Id+"'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    obj.userName = sdr["UserName"].ToString();
                    obj.email = sdr["UserEmail"].ToString();
                    obj.password = sdr["UserPassword"].ToString();
                    obj.firmName = sdr["FirmName"].ToString();
                    obj.since = sdr["RegisteredIn"].ToString();
                    obj.rating = sdr["Rating"].ToString();
                    obj.skills = sdr["Skills"].ToString();
                    obj.contact = sdr["Contact"].ToString();
                    obj.status = sdr["Status"].ToString();
                    obj.country = sdr["Country"].ToString();
                    obj.description = sdr["Description"].ToString();
                }
                con.Close();
                return obj;
            }
            catch (Exception e)
            {
                return obj;
                throw;
            }
        }
        public bool editProfile(user_entity obj) {
            try
            {
                //return true;
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Users set UserName = '"+obj.userName+"',FirmName = '"+obj.firmName+"',Description = '"+obj.description+"',Skills = '"+obj.skills+"',Contact = '"+obj.contact+"' where Email = '" + obj.email + "'";
                //string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
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
        public user_entity getInvestorProfile(string Id)
        {
            user_entity obj = new user_entity();
            //return obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Investors where UserEmail = '"+Id+"'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    obj.userName = sdr["UserName"].ToString();
                    obj.email = sdr["UserEmail"].ToString();
                    obj.password = sdr["UserPassword"].ToString();
                    obj.since = sdr["RegisteredIn"].ToString();
                    obj.contact = sdr["Contact"].ToString();
                    obj.country = sdr["Country"].ToString();
                    obj.description = sdr["InvestedAmount"].ToString();
                }
                con.Close();
                return obj;
            }
            catch (Exception e)
            {
                return obj;
                throw;
            }
        }
    }
}

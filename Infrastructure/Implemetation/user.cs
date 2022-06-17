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
                Console.WriteLine(e);
                return "Unknown Error";
                throw;
            }
        }
        public user_entity register(user_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                user_entity obj1 = new user_entity();
                //return obj1;
                if (obj.role == "")
                {
                    obj1.description = "Please select an Account type !";
                    return obj1;
                }
                else if (obj.country == "")
                {
                    obj1.description = "Please select your Country !";
                    return obj1;
                }
                bool match = false;
                con.Open();
                string query1 = "select Email from tbl_Users where Email = '" + obj.email + "'";
                SqlCommand com1 = new SqlCommand(query1, con);
                SqlDataReader sdr = com1.ExecuteReader();
                if (sdr.Read())
                {
                    match = true;
                }
                con.Close();
                if (!match)
                {
                    con.Open();
                    if (obj.role == "Business Owner")
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
                }
                obj1.description = (!match).ToString();
                return obj1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
                Console.WriteLine(e);
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
                Console.WriteLine(e);
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
                Console.WriteLine(e);
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
                Console.WriteLine(e);
                return list;
                throw;
            }
        }

        //////////  ======   For Investor Homepage   ======  /////////
        public List<advisor> getAllAdvisors(string id)
        {
            List<advisor> list = new List<advisor>();
            advisor obj;
            try
            {
                List<advisor> list1 = new List<advisor>();
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Advisors";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new advisor();
                    obj.advisorId = sdr["advisorId"].ToString();
                    obj.userName = sdr["UserName"].ToString();
                    obj.userEmail = sdr["UserEmail"].ToString();
                    obj.userPassword = sdr["UserPassword"].ToString();
                    obj.skills = sdr["Skills"].ToString();
                    obj.businessAdvised = sdr["Business"].ToString();
                    //list1 = getMyAdvisors(id);
                    //if (list1.Count > 0) {
                    //    obj.regiesteredIn = "Hired";
                    //}
                    con1.Open();
                    string query1 = "select * from tbl_AdvisorsHiring where InvestorId = '" + id + "' and AdvisorId='" + obj.userEmail + "'";
                    SqlCommand com1 = new SqlCommand(query1, con1);
                    SqlDataReader sdr1 = com1.ExecuteReader();
                    if (sdr1.Read())
                    {
                        obj.regiesteredIn = sdr1["CurrentStatus"].ToString();
                    }
                    con1.Close();
                    obj.firmName = sdr["FirmName"].ToString();
                    obj.rating = sdr["Rating"].ToString();
                    list.Add(obj);
                }
                con.Close();
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<advisor> getMyAdvisors(string id)
        {
            List<advisor> list = new List<advisor>();
            advisor obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_AdvisorsHiring where InvestorId = '" + id + "' and CurrentStatus = 'Accepted'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    con1.Open();
                    string query1 = "select * from tbl_Advisors where UserEmail = '" + sdr["AdvisorId"].ToString() + "'";
                    SqlCommand com1 = new SqlCommand(query1, con1);
                    SqlDataReader sdr1 = com1.ExecuteReader();
                    while (sdr1.Read())
                    {
                        obj = new advisor();
                        obj.advisorId = sdr1["advisorId"].ToString();
                        obj.userName = sdr1["UserName"].ToString();
                        obj.userEmail = sdr1["UserEmail"].ToString();
                        obj.userPassword = sdr1["UserPasswo rd"].ToString();
                        obj.regiesteredIn = sdr1["RegisteredIn"].ToString();
                        obj.firmName = sdr1["FirmName"].ToString();
                        obj.rating = sdr1["Rating"].ToString();
                        list.Add(obj);
                    }
                    con1.Close();
                }
                con.Close();
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
                Console.WriteLine(e);
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
                Console.WriteLine(e);
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
                string query = "select * from tbl_Advisors where UserEmail = '" + Id + "'";
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
                    obj.role = sdr["Business"].ToString();
                }
                con.Close();
                return obj;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return obj;
                throw;
            }
        }
        public bool editProfile(user_entity obj)
        {
            try
            {
                //return true;
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Advisors set UserName = '" + obj.userName + "',FirmName = '" + obj.firmName + "',Description = '" + obj.description + "',Skills = '" + obj.skills + "',Contact = '" + obj.contact + "',Business = '"+obj.role+"' where UserEmail = '" + obj.email + "'";
                //string query = "userRegister";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
                string query = "select * from tbl_Investors where UserEmail = '" + Id + "'";
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
                Console.WriteLine(e);
                return obj;
                throw;
            }
        }

        public List<user_entity> revealInvestors(user_entity obj,string email)
        {
            List<user_entity> list = new List<user_entity>();
            try
            {
                user_entity obj1;
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Deals where DealStatus='In Progress' and BId = " + obj.email;
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj1 = new user_entity();
                    obj1.email = sdr["InvestorEmail"].ToString();
                    obj1.description = sdr["Amount"].ToString();
                    con1.Open();
                    string query1 = "select * from tbl_Investors where  UserEmail = '" + obj1.email + "'";
                    SqlCommand com1 = new SqlCommand(query1, con1);
                    SqlDataReader sdr1 = com1.ExecuteReader();
                    if (sdr1.Read()) {
                        obj1.userName = sdr1["UserName"].ToString();
                        obj1.contact = sdr1["Contact"].ToString();
                        obj1.rating = sdr1["RegisteredIn"].ToString();
                        obj1.country = sdr1["Country"].ToString();
                    }
                    con1.Close();
                    list.Add(obj1);
                }
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public user_entity getAdvisorInfo(user_entity obj)
        {
            user_entity obj1 = new user_entity();
            SqlConnection con = new SqlConnection(connString);
            string query = "select * from tbl_Advisors where UserEmail = '"+obj.email+"'";
            con.Open();
            SqlCommand com = new SqlCommand(query, con);
            SqlDataReader sdr = com.ExecuteReader();
            if (sdr.Read())
            {
                obj1.userName = sdr["UserName"].ToString();
                obj1.email = sdr["UserEmail"].ToString();
                obj1.firmName = sdr["FirmName"].ToString();
                obj1.role = sdr["RegisteredIn"].ToString();
                obj1.description = sdr["Description"].ToString();
                obj1.skills = sdr["Skills"].ToString();
                obj1.contact = sdr["Contact"].ToString();
                obj1.country = sdr["Country"].ToString();
                obj1.rating = sdr["Rating"].ToString();
            }
            con.Close();
            return obj1;
        }
    }
}

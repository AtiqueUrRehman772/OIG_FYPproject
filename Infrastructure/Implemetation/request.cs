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
        public user_entity getRequestCount()
        {
            user_entity obj = new user_entity();
            int count = 0;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Requests where RequestStatus = 'Pending'";
                //string query = "getInvestorRequests";
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
        public user_entity getAccCount()
        {
            user_entity obj = new user_entity();
            int count = 0;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Requests where RequestStatus = 'Accepted'";
                //string query = "getInvestorRequests";
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
        public user_entity getDecCount()
        {
            user_entity obj = new user_entity();
            int count = 0;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Requests where RequestStatus = 'Declined'";
                //string query = "getInvestorRequests";
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
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<request_entity> getAdvisorRequests()
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                //string query = "select * from tbl_Users where Email = '"+obj.email+"' and Password = '"+obj.password+"'";
                string query = "getAdvisorRequests";
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
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<request_entity> getOwnerRequests()
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from [tbl_Requests] where UserRole = 'owner' and RequestStatus = 'Pending'";
                //string query = "getAdvisorRequests";
                SqlCommand com = new SqlCommand(query, con);
                //com.CommandType = CommandType.StoredProcedure;
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
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<request_entity> getAllRequests()
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Requests order by Id desc";
                //string query = "getAdvisorRequests";
                SqlCommand com = new SqlCommand(query, con);
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
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<request_entity> getHiringRequests(request_entity reqId)
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_AdvisorsHiring where AdvisorId = '" + reqId.userEmail + "' and CurrentStatus = 'Pending' order by HiringId desc";
                //string query = "getAdvisorRequests";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new request_entity();
                    obj.userName = sdr["AdvisorId"].ToString();
                    obj.userEmail = sdr["InvestorId"].ToString();
                    obj.userPassword = sdr["HiredOn"].ToString();
                    obj.userRole = sdr["Bid"].ToString();
                    obj.requestStatus = sdr["CurrentStatus"].ToString();
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
        public List<request_entity> getRequestsHistory(request_entity reqId)
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_AdvisorsHiring where AdvisorId = '" + reqId.userEmail + "' order by HiringId desc";
                //string query = "getAdvisorRequests";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new request_entity();
                    obj.userName = sdr["AdvisorId"].ToString();
                    obj.userEmail = sdr["InvestorId"].ToString();
                    obj.userPassword = sdr["HiredOn"].ToString();
                    obj.userRole = sdr["Bid"].ToString();
                    obj.requestStatus = sdr["CurrentStatus"].ToString();
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
        public List<request_entity> getInvestmentRequests(request_entity reqId)
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                string query1 = "select BId from tbl_Business where OwnerEmail = '" + reqId.userEmail + "'";
                con1.Open();
                SqlCommand com1 = new SqlCommand(query1, con1);
                SqlDataReader sdr1 = com1.ExecuteReader();
                while (sdr1.Read())
                {
                    con.Open();
                    string query = "select * from tbl_Deals where BId = '" + sdr1["BId"].ToString() + "' and DealStatus = 'Pending'";
                    SqlCommand com = new SqlCommand(query, con);
                    SqlDataReader sdr = com.ExecuteReader();
                    while (sdr.Read())
                    {
                        obj = new request_entity();
                        obj.userName = sdr["InvestorEmail"].ToString();
                        obj.userPassword = sdr["Amount"].ToString();
                        obj.userRole = sdr["Bid"].ToString();
                        obj.requestStatus = sdr["DealStatus"].ToString();
                        list.Add(obj);
                    }
                    con.Close();
                }
                con1.Close();
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        public List<request_entity> getInvestmentRequestsHistory(request_entity reqId)
        {
            List<request_entity> list = new List<request_entity>();
            request_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                string query1 = "select BId from tbl_Business where OwnerEmail = '" + reqId.userEmail + "'";
                con1.Open();
                SqlCommand com1 = new SqlCommand(query1, con1);
                SqlDataReader sdr1 = com1.ExecuteReader();
                while (sdr1.Read())
                {
                    con.Open();
                    string query = "select * from tbl_Deals where BId = '" + sdr1["BId"].ToString() + "'";
                    SqlCommand com = new SqlCommand(query, con);
                    SqlDataReader sdr = com.ExecuteReader();
                    while (sdr.Read())
                    {
                        obj = new request_entity();
                        obj.userName = sdr["InvestorEmail"].ToString();
                        obj.userPassword = sdr["Amount"].ToString();
                        obj.userRole = sdr["Bid"].ToString();
                        obj.requestStatus = sdr["DealStatus"].ToString();
                        list.Add(obj);
                    }
                    con.Close();
                }
                con1.Close();
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return list;
                throw;
            }
        }
        ///////////    CRUD Operations    ///////////

        public void declineRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Requests set RequestStatus = 'Declined' where UserEmail='" + reqId.userEmail + "'";
                //string query = "getInvestorRequests";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public void acceptRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Requests set RequestStatus = 'Accepted' where UserEmail='" + reqId.userEmail + "'";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                con.Open();
                user_entity obj = new user_entity();
                query = "select * from tbl_Requests where UserEmail = '" + reqId.userEmail + "'";
                com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    obj.userName = sdr["UserName"].ToString();
                    obj.email = sdr["UserEmail"].ToString();
                    obj.password = sdr["UserPassword"].ToString();
                    obj.role = sdr["UserRole"].ToString();
                    obj.status = sdr["Country"].ToString();
                }
                con.Close();
                con.Open();
                query = "insert into tbl_Users values('" + obj.userName + "','" + obj.email + "','" + obj.password + "','" + obj.role + "','" + DateTime.Now.ToString() + "')";
                com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                con.Open();
                if (obj.role == "Advisor")
                {
                    query = "insert into tbl_Advisors  values('" + obj.userName + "','" + obj.email + "','" + obj.password + "','','" + DateTime.Now.ToString() + "',0,'','','','Active','" + obj.status + "')";
                }
                else if (obj.role == "Investor")
                {
                    query = "insert into tbl_Investors  values('" + obj.userName + "','" + obj.email + "','" + obj.password + "','" + DateTime.Now.ToString() + "','" + obj.status + "','','')";
                }
                else if (obj.role == "owner")
                {
                    query = "insert into tbl_BOwner  values('" + obj.userName + "','" + obj.email + "','" + DateTime.Now.ToString() + "','','" + obj.status + "','')";
                }
                com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public bool acceptHiringRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_AdvisorsHiring set CurrentStatus = 'Accepted' where AdvisorId='" + reqId.userEmail + "' and InvestorId='" + reqId.userName + "'";
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
        public bool rejectHiringRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_AdvisorsHiring set CurrentStatus = 'Rejected' where AdvisorId='" + reqId.userEmail + "' and InvestorId='" + reqId.userName + "'";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                con.Open();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
                throw;
            }
        }
        public bool acceptInvestmentRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Deals set DealStatus = 'In Progress' where InvestorEmail = '"+reqId.userEmail+"' and BId = "+reqId.userName;
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                con.Open();
                query = "insert into tbl_InvestorNotifications values ('"+reqId.userRole+"','"+reqId.userEmail+"',"+reqId.userName+",'"+DateTime.Now.ToString()+"','Accepted','Not')";
                com = new SqlCommand(query, con);
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
        public bool declineInvestmentRequest(request_entity reqId)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Deals set DealStatus = 'Declined' where InvestorEmail = '" + reqId.userEmail + "' and BId = " + reqId.userName;
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                con.Open();
                query = "insert into tbl_InvestorNotifications values ('" + reqId.userRole + "','" + reqId.userEmail + "'," + reqId.userName + ",'" + DateTime.Now.ToString() + "','Declined','Not')";
                com = new SqlCommand(query, con);
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

    }
}

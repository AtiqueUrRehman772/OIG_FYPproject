using Infrastructure.Interface;
using Microsoft.Extensions.Configuration;
using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Implemetation
{
    public class business : Ibusiness
    {
        private IConfiguration Configuration;
        private readonly string connString;
        public business(IConfiguration _configuration)
        {
            Configuration = _configuration;
            connString = this.Configuration.GetConnectionString("db_connect");
        }
        public bool addNewBusiness(business_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "insert into tbl_Business values('" + obj.bName + "','" + obj.bOwner + "','" + obj.bCategory + "','" + DateTime.Now.ToString() + "',1,'" + obj.bId + "','" + obj.riskFactor + "','" + obj.registeredOn + "','" + obj.address + "','0','0','Incomplete')";
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
        public bool markComplete(business_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "update tbl_Business set Status='Complete' where BId = "+obj.bName;
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
        public List<business_entity> getAvailableBusiness()
        {
            List<business_entity> list = new List<business_entity>();
            business_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Business";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bName = sdr["BName"].ToString();
                    obj.bOwner = sdr["OwnerName"].ToString();
                    obj.bCategory = sdr["BCategory"].ToString();
                    obj.registeredOn = sdr["RegisteredOn"].ToString();
                    obj.riskFactor = sdr["RiskFactor"].ToString();
                    obj.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                    obj.status = sdr["OwnerEmail"].ToString();
                    obj.bId = sdr["BId"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<business_entity> getMyBusinesses(business_entity obj)
        {
            List<business_entity> list = new List<business_entity>();
            //return list;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Business where OwnerEmail = '" + obj.bName + "' and Status = 'Incomplete'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bName = sdr["BName"].ToString();
                    obj.ECD = sdr["Bid"].ToString();
                    obj.bOwner = sdr["OwnerName"].ToString();
                    obj.bCategory = sdr["BCategory"].ToString();
                    obj.registeredOn = sdr["RegisteredOn"].ToString();
                    obj.riskFactor = sdr["RiskFactor"].ToString();
                    obj.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                    obj.bId = sdr["OwnerEmail"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<business_entity> getClosedBusiness(business_entity obj)
        {
            List<business_entity> list = new List<business_entity>();
            //return list;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Business where OwnerEmail = '" + obj.bName + "' and Status = 'Complete'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bName = sdr["BName"].ToString();
                    obj.ECD = sdr["Bid"].ToString();
                    obj.bOwner = sdr["OwnerName"].ToString();
                    obj.bCategory = sdr["BCategory"].ToString();
                    obj.registeredOn = sdr["RegisteredOn"].ToString();
                    obj.riskFactor = sdr["RiskFactor"].ToString();
                    obj.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                    obj.bId = sdr["OwnerEmail"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<business_entity> getAdvisorBusiness(business_entity obj)
        {
            List<business_entity> list = new List<business_entity>();
            //return list;
            try
            {
                string skill = "";
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select Skills from tbl_Advisors where UserEmail = '" + obj.bCategory + "'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    skill = sdr["Skills"].ToString();
                }
                con.Close();
                string[] skills = skill.Split(',');
                for (int i = 0; i < skills.Length; i++)
                {
                    con.Open();
                    query = "select * from tbl_Business where BCategory = '" + skills[i] + "'";
                    com = new SqlCommand(query, con);
                    sdr = com.ExecuteReader();
                    while (sdr.Read())
                    {
                        obj = new business_entity();
                        obj.bId = sdr["BId"].ToString();
                        obj.bName = sdr["BName"].ToString();
                        obj.bOwner = sdr["OwnerName"].ToString();
                        obj.bCategory = sdr["BCategory"].ToString();
                        obj.registeredOn = sdr["RegisteredOn"].ToString();
                        obj.riskFactor = sdr["RiskFactor"].ToString();
                        obj.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                        obj.status = sdr["OwnerEmail"].ToString();
                        list.Add(obj);
                    }
                    con.Close();
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<business_entity> myDeals(business_entity obj)
        {
            List<business_entity> list = new List<business_entity>();
            //return list;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                SqlConnection con1 = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Deals where InvestorEmail = '" + obj.bName + "'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bOwner = sdr["BOwner"].ToString();
                    obj.bId = sdr["BId"].ToString();
                    obj.investedAmount = sdr["Amount"].ToString();
                    obj.status = sdr["DealStatus"].ToString();
                    obj.address = sdr["AdvisorAttatched"].ToString();
                    obj.bCategory = sdr["InvestorEmail"].ToString();
                    con1.Open();
                    string query1 = "select * from tbl_Business where Bid = '" + obj.bId + "'";
                    SqlCommand com1 = new SqlCommand(query1, con1);
                    SqlDataReader sdr1 = com1.ExecuteReader();
                    if (sdr1.Read())
                    {
                        obj.bName = sdr1["BName"].ToString();
                    }
                    con1.Close();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public void makeADeal(business_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "insert into tbl_Deals values (0," + obj.bId + ",'" + obj.bOwner + "','" + obj.investedAmount + "','Pending','" + obj.progress + "','" + obj.bName + "')";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        public business_entity getBusinessInfo(business_entity obj)
        {
            string bId = obj.bName;
            business_entity obj1 = new business_entity();
            //return list;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Business where Bid = " + bId;
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    obj1.bId = sdr["Bid"].ToString();
                    //obj1.ECD = sdr["ExpectedCD"].ToString();
                    //obj1.investedAmount = sdr["InvestedAmount"].ToString();
                    obj1.progress = sdr["Progress"].ToString();
                    obj1.status = sdr["Status"].ToString();
                    obj1.bName = sdr["BName"].ToString();
                    obj1.bOwner = sdr["OwnerName"].ToString();
                    obj1.bCategory = sdr["BCategory"].ToString();
                    obj1.registeredOn = sdr["RegisteredOn"].ToString();
                    obj1.riskFactor = sdr["RiskFactor"].ToString();
                    obj1.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                }
                con.Close();
                return obj1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return obj1;
                throw;
            }
        }
        public bool rateRisk(business_entity obj)
        {
            try
            {
                string risk = "";
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select RiskFactor from tbl_Business where BId = " + obj.bId;
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                if (sdr.Read())
                {
                    risk = sdr["RiskFactor"].ToString();
                }
                con.Close();
                risk = ((int.Parse(risk) + int.Parse(obj.progress)) / 2).ToString();
                con.Open();
                query = "update tbl_Business set RiskFactor = " + risk + " , RiskPercentage = '" + risk + "0' where BId = " + obj.bId;
                com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
                throw;
            }
        }
        public bool hireAdvisor(business_entity obj)
        {
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "insert into tbl_AdvisorsHiring values ('" + obj.bName + "','" + obj.bOwner + "','" + DateTime.Now.ToString() + "','Pending',0)";
                SqlCommand com = new SqlCommand(query, con);
                com.ExecuteNonQuery();
                con.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
                throw;
            }
        }
        public List<business_entity> getBusiness(business_entity bCat)
        {
            List<business_entity> list = new List<business_entity>();
            business_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "select * from tbl_Business where BCategory = '" + bCat.bCategory + "'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bName = sdr["BName"].ToString();
                    obj.bOwner = sdr["OwnerName"].ToString();
                    obj.bCategory = sdr["BCategory"].ToString();
                    obj.registeredOn = sdr["RegisteredOn"].ToString();
                    obj.riskFactor = sdr["RiskFactor"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<business_entity> getFilteredBusiness(business_entity bCat)
        {
            List<business_entity> list = new List<business_entity>();
            business_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "";
                if (bCat.progress == null || bCat.progress == "")
                    query = "select * from tbl_Business where BCategory = '" + bCat.bCategory + "'";
                else if (bCat.bCategory == null || bCat.bCategory == "")
                    query = "select * from tbl_Business where RiskPercentage < '" + bCat.progress + "'";
                else
                    query = "select * from tbl_Business where RiskPercentage < '" + bCat.progress + "' and BCategory = '" + bCat.bCategory + "'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new business_entity();
                    obj.bName = sdr["BName"].ToString();
                    obj.bOwner = sdr["OwnerName"].ToString();
                    obj.bCategory = sdr["BCategory"].ToString();
                    obj.registeredOn = sdr["RegisteredOn"].ToString();
                    obj.riskFactor = sdr["RiskFactor"].ToString();
                    obj.address = sdr["Address"].ToString() + ", " + sdr["City"] + ", " + sdr["Country"];
                    obj.status = sdr["OwnerEmail"].ToString();
                    obj.bId = sdr["BId"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
        public List<user_entity> getAssociatedAdvisors(business_entity bCat)
        {
            List<user_entity> list = new List<user_entity>();
            user_entity obj;
            try
            {
                SqlConnection con = new SqlConnection(connString);
                con.Open();
                string query = "";
                query = "select * from tbl_Advisors where Skills like '%" + bCat.bCategory + "%'";
                SqlCommand com = new SqlCommand(query, con);
                SqlDataReader sdr = com.ExecuteReader();
                while (sdr.Read())
                {
                    obj = new user_entity();
                    obj.userName = sdr["UserName"].ToString();
                    obj.email = sdr["UserEmail"].ToString();
                    obj.firmName = sdr["FirmName"].ToString();
                    obj.description = sdr["RegisteredIn"].ToString();
                    obj.rating = sdr["Rating"].ToString();
                    obj.contact = sdr["Contact"].ToString();
                    obj.country = sdr["Country"].ToString();
                    list.Add(obj);
                }
                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return list;
                throw;
            }
        }
    }
}

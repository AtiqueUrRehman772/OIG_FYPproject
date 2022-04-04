using OIG_Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interface
{
    public interface Iuser
    {
        public string login(user_entity obj);
        public bool register(user_entity obj);
    }
}

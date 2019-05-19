using MyContextApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IUserService
    {
        Task<ApplicationUser> Authenticate(string username, string password);
        Task<IEnumerable<ApplicationUser>> GetAll();
        Task<ApplicationUser> GetById(int id);
        Task<ApplicationUser> Create(ApplicationUser user, string password);
        void Update(ApplicationUser user, string password = null);
        void Delete(int id);
    }
}

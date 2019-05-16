using MyContextAPI.Common.Infastructure;
using MyContextAPI.Model.EnityModel;
using MyContextAPI.Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyContextAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<List<User>> GetAll();
        Task<User> GetById(string id);
        Task<User> Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(string id);
    }

}

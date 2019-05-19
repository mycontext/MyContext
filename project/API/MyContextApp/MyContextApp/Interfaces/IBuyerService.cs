using MyContextApp.Data.Entities;
using MyContextApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IBuyerService
    {
        
        Task<IEnumerable<BuyerDto>> GetAll();
        Task<BuyerDto> GetById(int id);
        Task<BuyerDto> Create(BuyerDto model);
        void Update(BuyerDto model);
        void Delete(int id);
    }
}

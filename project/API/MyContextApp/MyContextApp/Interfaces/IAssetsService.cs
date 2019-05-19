 
using MyContextApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IAssetsService
    {
        
        Task<IEnumerable<AssetDto>> GetAll();
        Task<AssetDto> GetById(int id);
        Task<AssetDto> Create(AssetDto asset);
        void Update(AssetDto asset );
        void Delete(int id);
    }
}

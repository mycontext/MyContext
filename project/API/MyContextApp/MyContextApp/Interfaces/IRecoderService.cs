using MyContextApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IRecoderService
    {

        Task<IEnumerable<RecoderDto>> GetAll();
        Task<RecoderDto> GetById(int id);
        Task<RecoderDto> Create(RecoderDto model);
        void Update(RecoderDto model);
        void Delete(int id);
    }
}

using MyContextApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IRecorderService
    {

        Task<IEnumerable<RecorderDto>> GetAll();
        Task<RecorderDto> GetById(int id);
        Task<RecorderDto> Create(RecorderDto model);
        void Update(RecorderDto model);
        void Delete(int id);
    }
}

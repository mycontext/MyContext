using MyContextApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyContextApp.Interfaces
{
    public interface IPatientService
    {
        
        Task<IEnumerable<PatientDto>> GetAll();
        Task<PatientDto> GetById(int id);
        Task<PatientDto> Create(PatientDto model);
        void Update(PatientDto model);
        void Delete(int id);
    }
}

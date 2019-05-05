using MyContextAPI.Model.Models;
using System;
using System.Threading.Tasks;

namespace MyContextAPI.Services.Interfaces
{
    public interface IPatientService
    {
        Task<PatientDTO> GetPatientAsync(string id);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MyContextAPI.Model;
using MyContextAPI.Model.DBServices;
using MyContextAPI.Model.EnityModel;
using MyContextAPI.Model.Models;
using MyContextAPI.Services.Interfaces;

namespace MyContextAPI.Services.APIServices
{
    public class PatientService : IPatientService
    {
       private readonly MongoDBContext _context;

        public PatientService(IConfiguration config)
        {
            _context = new MongoDBContext(config);
        }

        public async Task<IEnumerable<PatientDTO>> GetPatientsAsync()
        {
            List<PatientDTO> DTOLst= new List<PatientDTO>() ;
            try
            {
                IEnumerable<Patient> DataList =_context.Patients.Find(new BsonDocument()).ToEnumerable();
                foreach (Patient patient in DataList)
                {
                    DTOLst.Add(new PatientDTO() {
                        ID=patient.Id,
                        PatientReference = patient.PatientReference,
                        PatientNo = patient.PatientNo,


                    });
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return DTOLst;
        }
    }
}

using MyContextApp.Data;
using MyContextApp.Data.Entities;
using MyContextApp.Interfaces;
using MyContextApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Services
{
    public class PatientService : IPatientService
    {
        private ApplicationDbContext _context;
        public PatientService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PatientDto>> GetAll()
        {
            List<PatientDto> mdoelList = new List<PatientDto>();
            var data = _context.PatientParticipant.Where(c => c.Id > 0);
            foreach (var asset in data)
            {
                mdoelList.Add(new PatientDto()
                {
                    Description = asset.Description,
                    ReferenceNo = asset.ReferenceNo,
                    Id = asset.Id,
                    ChainId = asset.ChainId,
                    UserId = asset.UserId
                });

            }
            return mdoelList;
        }

        public async Task<PatientDto> GetById(int id)
        {
            var data = _context.PatientParticipant.Find(id);
            PatientDto model = new PatientDto() {
                
            };
           
            return model;
        }

        public async Task<PatientDto> Create(PatientDto model)
        {
            // validation
            PatientParticipant data = new PatientParticipant()
            {
                Description = model.Description,
                ReferenceNo = model.ReferenceNo,
                Id = model.Id,
                ChainId = model.ChainId,
                UserId = model.UserId
            };

            _context.PatientParticipant.Add(data);
            _context.SaveChanges();
            model.Id = data.Id;
            return model;
        }

        public async void Update(PatientDto model)
        {
            var data = _context.PatientParticipant.Find(model.Id);
            if (data != null)
            {
                data.Description = model.Description;
                data.ReferenceNo = model.ReferenceNo;
                data.Id = model.Id;
                data.ChainId = model.ChainId;
                data.UserId = model.UserId;
                _context.PatientParticipant.Update(data);
                _context.SaveChanges();
            }

        }

        public async void Delete(int id)
        {
            var data = _context.PatientParticipant.Find(id);
            if (data != null)
            {
                _context.PatientParticipant.Remove(data);
                _context.SaveChanges();
            }
        }



    }

}

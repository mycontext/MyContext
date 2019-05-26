using MyContextApp.Data;
using MyContextApp.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyContextApp.Interfaces;
using MyContextApp.Models;

namespace MyContextApp.Services
{
    public class RecorderService : IRecorderService
    {
        private ApplicationDbContext _context;
        public RecorderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RecorderDto>> GetAll()
        {
            List<RecorderDto> mdoelList = new List<RecorderDto>();
            var data = _context.RecoderParticipant.Where(c => c.Id > 0);
            foreach (var asset in data)
            {
                mdoelList.Add(new RecorderDto()
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

        public async Task<RecorderDto> GetById(int id)
        {
            var data = _context.RecoderParticipant.Find(id);
            RecorderDto model = new RecorderDto() {
                
            };
           
            return model;
        }

        public async Task<RecorderDto> Create(RecorderDto model)
        {
            // validation
            RecoderParticipant data = new RecoderParticipant()
            {
                Description = model.Description,
                ReferenceNo = model.ReferenceNo,
                Id = model.Id,
                ChainId = model.ChainId,
                UserId = model.UserId
            };

            _context.RecoderParticipant.Add(data);
            _context.SaveChanges();
            model.Id = data.Id;
            return model;
        }

        public async void Update(RecorderDto model)
        {
            var data = _context.RecoderParticipant.Find(model.Id);
            if (data != null)
            {
                data.Description = model.Description;
                data.ReferenceNo = model.ReferenceNo;
                data.Id = model.Id;
                data.ChainId = model.ChainId;
                data.UserId = model.UserId;
                _context.RecoderParticipant.Update(data);
                _context.SaveChanges();
            }

        }

        public async void Delete(int id)
        {
            var data = _context.RecoderParticipant.Find(id);
            if (data != null)
            {
                _context.RecoderParticipant.Remove(data);
                _context.SaveChanges();
            }
        }



    }

}

using MyContextApp.Data;
using MyContextApp.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MyContextApp.Interfaces;
using MyContextApp.Models;

namespace MyContextApp.Services
{
    public class BuyerService : IBuyerService
    {
        private ApplicationDbContext _context;
        public BuyerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BuyerDto>> GetAll()
        {
            List<BuyerDto> mdoelList = new List<BuyerDto>();
            var data = _context.BuyerParticipants.Where(c => c.Id > 0);
            foreach (var asset in data)
            {
                mdoelList.Add(new BuyerDto()
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

        public async Task<BuyerDto> GetById(int id)
        {
            var data = _context.BuyerParticipants.Find(id);
            BuyerDto model = new BuyerDto() {
                
            };
           
            return model;
        }

        public async Task<BuyerDto> Create(BuyerDto model)
        {
            // validation
            BuyerParticipant data = new BuyerParticipant()
            {
                Description = model.Description,
                ReferenceNo = model.ReferenceNo,
                Id = model.Id,
                ChainId = model.ChainId,
                UserId = model.UserId
            };

            _context.BuyerParticipants.Add(data);
            _context.SaveChanges();
            model.Id = data.Id;
            return model;
        }

        public async void Update(BuyerDto model)
        {
            var data = _context.BuyerParticipants.Find(model.Id);
            if (data != null)
            {
                data.Description = model.Description;
                data.ReferenceNo = model.ReferenceNo;
                data.Id = model.Id;
                data.ChainId = model.ChainId;
                data.UserId = model.UserId;
                _context.BuyerParticipants.Update(data);
                _context.SaveChanges();
            }

        }

        public async void Delete(int id)
        {
            var data = _context.BuyerParticipants.Find(id);
            if (data != null)
            {
                _context.BuyerParticipants.Remove(data);
                _context.SaveChanges();
            }
        }



    }

}

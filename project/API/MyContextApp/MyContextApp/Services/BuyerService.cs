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
            var data = _context.BuyerParticipant.Where(c => c.Id > 0);
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
            var data = _context.BuyerParticipant.Find(id);
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

            _context.BuyerParticipant.Add(data);
            _context.SaveChanges();
            model.Id = data.Id;
            return model;
        }

        public async void Update(BuyerDto model)
        {
            var data = _context.BuyerParticipant.Find(model.Id);
            if (data != null)
            {
                data.Description = model.Description;
                data.ReferenceNo = model.ReferenceNo;
                data.Id = model.Id;
                data.ChainId = model.ChainId;
                data.UserId = model.UserId;
                _context.BuyerParticipant.Update(data);
                _context.SaveChanges();
            }

        }

        public async void Delete(int id)
        {
            var data = _context.BuyerParticipant.Find(id);
            if (data != null)
            {
                _context.BuyerParticipant.Remove(data);
                _context.SaveChanges();
            }
        }



    }

}

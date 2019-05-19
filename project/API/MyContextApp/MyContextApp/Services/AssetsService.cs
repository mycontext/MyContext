using MyContextApp.Data;
using MyContextApp.Data.Entities;
using MyContextApp.Interfaces;
using MyContextApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Services
{
    public class AssetsService : IAssetsService
    {
        private ApplicationDbContext _context;
        public AssetsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AssetDto>> GetAll()
        {
            List<AssetDto> assets = new List<AssetDto>();
            var data = _context.Assets.Where(c => c.Id > 0);
            foreach (var asset in data)
            {
                assets.Add(new AssetDto()
                {
                    Description = asset.Description,
                    ReferenceNo = asset.ReferenceNo,
                    PatientId = asset.PatientId,
                    RecorderId = asset.RecorderId,
                    Id = asset.Id
                });

            }
            return assets;
        }

        public async Task<AssetDto> GetById(int id)
        {
            var data = _context.Assets.Find(id);
            AssetDto asset = new AssetDto();
            asset.Description = data.Description;
            asset.ReferenceNo = data.ReferenceNo;
            asset.PatientId = data.PatientId;
            asset.RecorderId = data.RecorderId;
            asset.Id = data.Id;
            return asset;
        }

        public async Task<AssetDto> Create(AssetDto newAsset)
        {
            // validation
            Asset asset = new Asset();
            asset.Description = newAsset.Description;
            asset.ReferenceNo = newAsset.ReferenceNo;
            asset.PatientId = newAsset.PatientId;
            asset.RecorderId = newAsset.RecorderId;

            _context.Assets.Add(asset);
            _context.SaveChanges();
            newAsset.Id = asset.Id;
            return newAsset;
        }

        public async void Update(AssetDto newAsset)
        {
            var asset = _context.Assets.Find(newAsset.Id);
            if (asset != null)
            {
                asset.Description = newAsset.Description;
                asset.ReferenceNo = newAsset.ReferenceNo;
                asset.PatientId = newAsset.PatientId;
                asset.RecorderId = newAsset.RecorderId;
                _context.Assets.Update(asset);
                _context.SaveChanges();
            }

        }

        public async void Delete(int id)
        {
            var asset = _context.Assets.Find(id);
            if (asset != null)
            {
                _context.Assets.Remove(asset);
                _context.SaveChanges();
            }
        }



    }

}

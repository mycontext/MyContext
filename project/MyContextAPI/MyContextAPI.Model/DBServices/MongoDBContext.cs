using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MyContextAPI.Model.EnityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextAPI.Model.DBServices
{
    public class MongoDBContext {
        private readonly IMongoDatabase _database = null;
        public MongoDBContext(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MyContextDB"));
            _database = client.GetDatabase(config.GetSection("MyContextDBName").ToString());
        }
        public IMongoCollection<Patient> Patients
        {
            get
            {
                return _database.GetCollection<Patient>("Patient");
            }
        }
        public IMongoCollection<User> Users
        {
            get
            {
                return _database.GetCollection<User>("User");
            }
        }

    }
}

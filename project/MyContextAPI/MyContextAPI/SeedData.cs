using Microsoft.Extensions.DependencyInjection;
using MyContextAPI.Model;
using MyContextAPI.Model.EnityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyContextAPI
{
    public static class SeedData
    {
        public static async Task InitAsync(IServiceProvider services)
        {
            await AddTestData(services.GetRequiredService<MyDbContext>());
        }
        public static async Task AddTestData(MyDbContext context)
        {
            if (context.Patients.ToList().Any())
            {
                return;
            }

            context.Patients.Add(new PatientEntity { ID = Guid.NewGuid(), PatientNo = "PT00001", CancerType = "Blood", CancerTypeID = 1 });
            context.Patients.Add(new PatientEntity { ID = Guid.NewGuid(), PatientNo = "PT00002", CancerType = "Blood", CancerTypeID = 1 });
            context.Patients.Add(new PatientEntity { ID = Guid.NewGuid(), PatientNo = "PT00003", CancerType = "Blood", CancerTypeID = 1 });
            context.Patients.Add(new PatientEntity { ID = Guid.NewGuid(), PatientNo = "PT00004", CancerType = "Blood", CancerTypeID = 1 });
            await context.SaveChangesAsync();
        }
    }
}

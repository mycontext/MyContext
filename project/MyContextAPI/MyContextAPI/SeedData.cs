using Microsoft.AspNetCore.Identity;
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
            await AddTestUsers(
               services.GetRequiredService<RoleManager<UserRoleEntity>>(),
               services.GetRequiredService<UserManager<UserEntity>>());
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
        private static async Task AddTestUsers(
          RoleManager<UserRoleEntity> roleManager,
          UserManager<UserEntity> userManager)
        {
            var dataExists = roleManager.Roles.Any() || userManager.Users.Any();
            if (dataExists)
            {
                return;
            }

            // Add a test role
            await roleManager.CreateAsync(new UserRoleEntity("Admin"));

            // Add a test user
            var user = new UserEntity
            {
                Email = "anish@mycontext.local",
                UserName = "anish@mycontext.local",
                FirstName = "Admin",
                LastName = "Tester",
                CreatedAt = DateTimeOffset.UtcNow
            };

            await userManager.CreateAsync(user, "Supersecret123!!");

            // Put the user in the admin role
            await userManager.AddToRoleAsync(user, "Admin");
            await userManager.UpdateAsync(user);
        }
    }
}

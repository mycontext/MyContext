using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using MyContextApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Data
{
    public class SeedData
    {
        public static async Task InitAsync(IServiceProvider services)
        {
            await AddTestUsers(
               services.GetRequiredService<RoleManager<IdentityRole>>(),
               services.GetRequiredService<UserManager<ApplicationUser>>());
            //await AddTestData(services.GetRequiredService<ApplicationDbContext>());
        }
        private static async Task AddTestUsers(
         RoleManager<IdentityRole> roleManager,
         UserManager<ApplicationUser> userManager)
        {
            var dataExists = roleManager.Roles.Any() || userManager.Users.Any();
            if (dataExists)
            {
                return;
            }

            // Add a test role
            await roleManager.CreateAsync(new IdentityRole("Admin"));

            // Add a test user
            var user = new ApplicationUser
            {
                Email = "patient@mycontext.local",
                UserName = "patient@mycontext.local",
                SecurityStamp = Guid.NewGuid().ToString(),
                
            };
            var user1 = new ApplicationUser
            {
                Email = "buyer@mycontext.local",
                UserName = "buyer@mycontext.local",
                SecurityStamp = Guid.NewGuid().ToString(),

            };
            var user2 = new ApplicationUser
            {
                Email = "recorder@mycontext.local",
                UserName = "recorder@mycontext.local",
                SecurityStamp = Guid.NewGuid().ToString(),

            };

            await userManager.CreateAsync(user1, "Supersecret123!!");
            await userManager.CreateAsync(user2, "Supersecret123!!");
            await userManager.CreateAsync(user, "Supersecret123!!");

            // Put the user in the admin role
            //  await userManager.AddToRoleAsync(user, "Admin");
            //  await userManager.UpdateAsync(user);
        }
        //private readonly ApplicationDbContext _context;
        //public SeedData(ApplicationDbContext  context)
        //{
        //    _context = context;

        //}
        //public  void Init(IServiceProvider serviceProvider)
        //{
        //      var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        //    //context.Database.EnsureCreated();
        //    if (!_context.Users.Any())
        //    {
        //        ApplicationUser user = new ApplicationUser()
        //        {
        //            Email="user1@mycontext.com",
        //            SecurityStamp= Guid.NewGuid().ToString(),
        //            UserName="user1"
        //        };
        //        userManager.CreateAsync(user, "pass@123");
        //    }
        //}
    }
}

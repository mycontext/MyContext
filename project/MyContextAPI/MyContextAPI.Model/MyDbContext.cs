
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyContextAPI.Model.EnityModel;
using System;

namespace MyContextAPI.Model
{
    public class MyDbContext: IdentityDbContext<UserEntity,UserRoleEntity,Guid>
    {
        public MyDbContext( DbContextOptions options):base(options)
        {        }
        public DbSet<PatientEntity> Patients { get; set; }

    }
}

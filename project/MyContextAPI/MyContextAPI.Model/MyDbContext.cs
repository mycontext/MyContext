
using Microsoft.EntityFrameworkCore;
using MyContextAPI.Model.EnityModel;

namespace MyContextAPI.Model
{
    public class MyDbContext: DbContext
    {
        public MyDbContext( DbContextOptions options):base(options)
        {        }
        public DbSet<PatientEntity> Patients { get; set; }

    }
}

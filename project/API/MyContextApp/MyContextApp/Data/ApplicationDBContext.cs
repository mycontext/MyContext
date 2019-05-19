using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyContextApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Data
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base ()
        {

        }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<PatientParticipant> PatientParticipant { get; set; }
        public DbSet<RecoderParticipant> RecoderParticipants { get; set; }
        public DbSet<BuyerParticipant> BuyerParticipants { get; set; }
        public DbSet<TransactionPatientToBuyber> Transactions { get; set; }
        //public DbSet<TransactionPatientToRecoder> Tansactions2 { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source=.;Initial Catalog=MyContextDb;Integrated Security=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        
    }
}

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MyContextAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var host= CreateWebHostBuilder(args).Build();
            InitializeDatabase(host);
                host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        public static void InitializeDatabase(IWebHost host)
        {
            using (var scope= host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    SeedData.InitAsync(services).Wait();
                }
                catch (System.Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "an error occur seeding database");
                    throw;
                }
            }
        }
    }
}

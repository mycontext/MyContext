using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyContextAPI.FIlters;
using MyContextAPI.Model;
using MyContextAPI.Model.EnityModel;
using MyContextAPI.Model.Models;
using MyContextAPI.Services.APIServices;
using MyContextAPI.Services.Interfaces;
using NSwag.AspNetCore;

namespace MyContextAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            // use in memory database
            services.AddScoped<IPatientService, PatientService>();
            services.AddDbContext<MyDbContext>(options => options.UseInMemoryDatabase("mydb"));
            AddIdentityCoreServices(services);
            services
                .AddMvc(options =>
                {
                    options.Filters.Add<JsonExceptionFilter>();
                    options.Filters.Add<RequiredHttpsOrCloseAttribute>();
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddSwaggerDocument();
            services.AddApiVersioning(options => {
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ApiVersionReader = new MediaTypeApiVersionReader();
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ReportApiVersions = true;
                options.ApiVersionSelector = new CurrentImplementationApiVersionSelector(options);
            }); 
            services.AddCors(options => {
                options.AddPolicy("AllowMyApp", policy => policy.AllowAnyOrigin());
            });
        

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUi3();

            }
            else
            {
                app.UseHsts();
            }
            app.UseCors("AllowMyApp");
            app.UseMvc();

        }
        private static void AddIdentityCoreServices(IServiceCollection services)
        {
            var builder = services.AddIdentityCore<UserEntity>();
            builder = new IdentityBuilder(builder.UserType, typeof(UserRoleEntity), builder.Services);
            builder.AddRoles<UserRoleEntity>().AddEntityFrameworkStores<MyDbContext>().AddDefaultTokenProviders().AddSignInManager<SignInManager<UserEntity>>();
        }
    }
}

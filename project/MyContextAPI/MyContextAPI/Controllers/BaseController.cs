using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyContextAPI.Model.Model;

namespace MyContextAPI.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        public  AppSettings _appSettings;
        public BaseController( )
        { 
        }

    }
}

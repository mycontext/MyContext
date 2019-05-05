using Microsoft.AspNetCore.Mvc;
using MyContextAPI.Model.Models;

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

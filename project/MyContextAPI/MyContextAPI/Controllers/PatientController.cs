using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyContextAPI.Model.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyContextAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        // GET: /<controller>/
        [Route("[action]")]
        [HttpGet]
        public IActionResult GetPatients()
        {
            List<PatientDTO> PatientList = new List<PatientDTO>();
            PatientList.Add(new PatientDTO {  PatientNo = "PT00001",  PatientReference="Blood" }); PatientList.Add(new PatientDTO { PatientNo = "PT00001", PatientReference = "Blood" });
            return Ok(PatientList);
        }


    }
}
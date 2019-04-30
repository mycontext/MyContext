using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyContextAPI.Model.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyContextAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        // GET: /<controller>/
        [Route("[action]")]
        public IActionResult GetPatients()
        {
            List<PatientDTO> PatientList = new List<PatientDTO>();
            PatientList.Add(new PatientDTO { ID = Guid.NewGuid(), PatientNo = "PT00001", CancerType="Blood", CancerTypeID = 1 });
            PatientList.Add(new PatientDTO { ID = Guid.NewGuid(), PatientNo = "PT00002", CancerType = "Blood", CancerTypeID = 1 });
            PatientList.Add(new PatientDTO { ID = Guid.NewGuid(), PatientNo = "PT00003", CancerType = "Blood", CancerTypeID = 1 });
            PatientList.Add(new PatientDTO { ID = Guid.NewGuid(), PatientNo = "PT00004", CancerType = "Blood", CancerTypeID = 1 });
            return Ok(PatientList);
        }

    }
}
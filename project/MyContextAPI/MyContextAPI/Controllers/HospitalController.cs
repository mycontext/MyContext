using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyContextAPI.Model.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyContextAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        // GET: /<controller>/
        [Route("[action]")]
        public IActionResult GetHospital()
        {
            List<HospitalDTO> PatientList = new List<HospitalDTO>();
            PatientList.Add(new HospitalDTO { ID = Guid.NewGuid(), HospitalReferenceID = "HPT00001", Name ="Blood",  TypeID = 1 });
            PatientList.Add(new HospitalDTO { ID = Guid.NewGuid(), HospitalReferenceID = "HPT00002", Name = "Blood", TypeID = 1 });
            PatientList.Add(new HospitalDTO { ID = Guid.NewGuid(), HospitalReferenceID = "HPT00003", Name = "Blood", TypeID = 1 });
            PatientList.Add(new HospitalDTO { ID = Guid.NewGuid(), HospitalReferenceID = "HPT00004", Name = "Blood", TypeID = 1 });
            return Ok(PatientList);
        }

    }
}
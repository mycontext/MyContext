using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyContextAPI.Model.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyContextAPI.Controllers
{

    public class CompanyController : BaseController
    {
        public CompanyController(IOptions<AppSetting> options)
        {
            _appSettings = options.Value;
        }
        // GET: /<controller>/
        [Route("[action]")]
        public IActionResult GetCompanies()
        {
            List<CompanyDTO> PatientList = new List<CompanyDTO>();
            PatientList.Add(new CompanyDTO { ID = Guid.NewGuid(), CompanyReferenceID = "CP00001", Name = "com1", Description = "Description" });
            PatientList.Add(new CompanyDTO { ID = Guid.NewGuid(), CompanyReferenceID = "CP00002", Name = "com2", Description = "Description" });
            PatientList.Add(new CompanyDTO { ID = Guid.NewGuid(), CompanyReferenceID = "CP00003", Name = "com3", Description = "Description", });
            PatientList.Add(new CompanyDTO { ID = Guid.NewGuid(), CompanyReferenceID = "CP00004", Name = "com4", Description = "Description", });
            return Ok(PatientList);
        }
        [Route("[action]")]
        public IActionResult GetSetting()
        {
            return Ok(_appSettings);
        }

    }
}
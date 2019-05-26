using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyContextApp.Interfaces;
using MyContextApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    public class BuyerController : ControllerBase
    {
        private IBuyerService _service;
        public BuyerController(IBuyerService service)
        {
            _service = service;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            var data = _service.GetAll();
            return Ok(data.Result );
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _service.GetById(id); 
            return Ok(data);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]BuyerDto value)
        {
              
            _service.Update(value);
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}

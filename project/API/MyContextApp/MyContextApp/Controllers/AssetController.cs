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
    public class AssetController : ControllerBase
    {
        private IAssetsService _userService;
        public AssetController(IAssetsService userService)
        {
            _userService = userService;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            var data = _userService.GetAll();
            return Ok(data);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _userService.GetById(id); 
            return Ok(data);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]AssetDto value)
        {
              
            _userService.Update(value);
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}

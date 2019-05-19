using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyContextApp.Data.Entities;
using MyContextApp.Helpers;
using MyContextApp.Interfaces;
using MyContextApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyAPI.Controllers
{


    [Route("api/[controller]")]
    [ApiController] 
    public class AccountController : ControllerBase
    {
        private IUserService _userService;

        private readonly AppSettings _appSettings;
        [HttpGet ]
        [Route("gett")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }
        public AccountController(IUserService userService, IOptions<AppSettings> appSettings) => _userService = userService;
        [AllowAnonymous]
        [HttpPost]
        [Route("[Action]")]
        public IActionResult Authenticate([FromBody]UserLoginDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user.Result == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("UsernameUsername");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = user.Result.Id,
                Username = user.Result.UserName, 
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[Action]")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            ApplicationUser user = new ApplicationUser
            {
                Email = userDto.Email,
                UserName = userDto.Username, 
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            try
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("[Action]")]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<ApplicationUser> users = await _userService.GetAll();
            List<UserDto> usersDtoList= new List<UserDto>();
            foreach (ApplicationUser user in users)
            {
                usersDtoList.Add(new UserDto()
                {
                    Username = user.UserName,
                    Email = user.Email
                });
            } 
            return Ok(usersDtoList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user =await _userService.GetById(id);
            var userDto = new UserDto()
            {
                Username = user.UserName,
                Email = user.Email
            };
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]UserDto userDto)
        {
            // map dto to entity and set id
            ApplicationUser user = new ApplicationUser
            {
                Email = userDto.Email,
                UserName = userDto.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            user.Id = id;

            try
            {
                // save 
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}

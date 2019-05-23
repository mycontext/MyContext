using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Models
{
    public class UserDto
    {
        [Required(ErrorMessage ="required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "required")]
        public string Password { get; set; }
        public string Email { get; set; }
        [Required(ErrorMessage = "required")]
        public string ConfirmPassword { get; set; }
        public int AccountType { get; set; }

    }
}

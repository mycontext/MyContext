using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Models
{
    public class RegisterDto
    {       
        [Required(ErrorMessage = "required")]
        public string Password { get; set; }
        public string Email { get; set; }
        [Required(ErrorMessage = "required")]
        public string CPassword { get; set; }
        public string userId { get; set; }

    }
}

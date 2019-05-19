using System.ComponentModel.DataAnnotations;

namespace MyContextApp.Models
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = "required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "required")]
        public string Password { get; set; }
    }
}

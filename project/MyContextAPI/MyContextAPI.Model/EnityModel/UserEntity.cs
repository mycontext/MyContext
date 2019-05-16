using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyContextAPI.Model.EnityModel
{
    public class UserEntity :IdentityUser<Guid>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }

}

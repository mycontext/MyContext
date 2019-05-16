using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyContextAPI.Model.EnityModel
{
    public class UserRoleEntity: IdentityRole<Guid>
    {
        public UserRoleEntity():base()
        {

        }
        public UserRoleEntity(string roleName) : base(roleName)
        {

        }
    }
}

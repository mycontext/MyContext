using Microsoft.AspNetCore.Identity;
using MyContextApp.Data;
using MyContextApp.Data.Entities;
using MyContextApp.Helpers;
using MyContextApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Services
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        public UserService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<ApplicationUser> Authenticate(string username, string password)
        {


            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _userManager.FindByNameAsync(username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!await _userManager.CheckPasswordAsync(user, password))
                return null;

            // authentication successful
            return user;
        }

        public async Task<IEnumerable<ApplicationUser>> GetAll()
        {
            var data = _context.Users.Where(c => !string.IsNullOrEmpty(c.Id));
            return data;
        }

        public async Task<ApplicationUser> GetById(int id)
        {
             var data= _context.Users.Find(id);
            return data;
        }

        public async Task<ApplicationUser> Create(ApplicationUser user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.UserName == user.UserName))
                throw new AppException("Username \"" + user.UserName + "\" is already taken");


            user.Email = user.UserName;
            user.SecurityStamp = Guid.NewGuid().ToString();
            await _userManager.CreateAsync(user, password);

            return user;
        }

        public async void Update(ApplicationUser userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.UserName != user.UserName)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.UserName == userParam.UserName))
                    throw new AppException("Username " + userParam.UserName + " is already taken");
            }

            await _userManager.UpdateAsync(user);

 
        }

        public async void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
            }
        }

        // private helper methods

        //private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        //{
        //    if (password == null) throw new ArgumentNullException("password");
        //    if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

        //    using (var hmac = new System.Security.Cryptography.HMACSHA512())
        //    {
        //        passwordSalt = hmac.Key;
        //        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //    }
        //}

        //private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        //{
        //    if (password == null) throw new ArgumentNullException("password");
        //    if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
        //    if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
        //    if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

        //    using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
        //    {
        //        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //        for (int i = 0; i < computedHash.Length; i++)
        //        {
        //            if (computedHash[i] != storedHash[i]) return false;
        //        }
        //    }

        //    return true;
        //}

         
    }
}

using MyContextAPI.Services.Interfaces;
using MyContextAPI.Model.Models;
using System;
using System.Threading.Tasks;
using MyContextAPI.Common.Infastructure;
using MyContextAPI.Model.EnityModel;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using MyContextAPI.Model.DBServices;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Collections.Generic;
using MongoDB.Bson;

namespace MyContextAPI.Services.APIServices
{
    public class UserService : IUserService
    {
        private readonly MongoDBContext _context;

        public UserService(IConfiguration config)
        {
            _context = new MongoDBContext(config);
        }


        public async Task<User> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;
            User User = new User(); 
            using (IAsyncCursor<User> cursor = await _context.Users.FindAsync(user => user.Username == username))
            {
                while (await cursor.MoveNextAsync())
                {
                    IEnumerable<User> batch = cursor.Current;
                    foreach (User user in batch)
                    {
                        User = user;
                    }
                }
            }
            // check if username exists
            if (User == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, User.PasswordHash, User.PasswordSalt))
                return null;

            // authentication successful
            return User;
        }

        public async  Task<List<User>> GetAll()
        {
            try
            {
               return await _context.Users.Find(new BsonDocument()).ToListAsync(); ;
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public async Task<User> GetById(string id)
        {
            return await _context.Users.Find(x => x.Id.Equals( id)).FirstOrDefaultAsync();
        }

        public async Task<User> Create(User user, string password)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(password))
                    throw new AppException("Password is required");

                if (_context.Users.Find(x => x.Username == user.Username).Any())
                    throw new AppException("Username \"" + user.Username + "\" is already taken");

                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                await _context.Users.InsertOneAsync(user);                
            }
            catch (Exception ex)
            {
                throw;
            } 
            return user;
        }

        public async void Update(User userParam, string password = null)
        {
            try
            {
                User user = await _context.Users.Find(x => x.Id == userParam.Id).FirstOrDefaultAsync();

                if (user == null)
                    throw new AppException("User not found");

                if (userParam.Username != user.Username)
                {
                    // username has changed so check if the new username is already taken
                    if (_context.Users.Find(x => x.Username == userParam.Username).Any())
                        throw new AppException("Username " + userParam.Username + " is already taken");
                }

                // update user properties
                user.FirstName = userParam.FirstName;
                user.LastName = userParam.LastName;
                user.Username = userParam.Username;

                // update password if it was entered
                if (!string.IsNullOrWhiteSpace(password))
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash(password, out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                }

                var result = await _context.Users.FindOneAndReplaceAsync(x => x.Id == userParam.Id, user);
            }
            catch (Exception ex)
            {

                throw;
            }
           
            
        }

        public async void Delete(string id)
        {
            try
            {
                var user = await _context.Users.DeleteOneAsync(x => x.Id.Equals(id));
            }
            catch (Exception ex)
            {
                throw;
            }
                
           
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        
    }
}

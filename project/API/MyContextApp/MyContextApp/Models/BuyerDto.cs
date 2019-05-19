using System;

namespace MyContextApp.Models
{
    public class BuyerDto
    {
        public long Id { get; set; }
        public Guid UserId { get; set; }
        public string ReferenceNo { get; set; }
        public string Description { get; set; }
        public string ChainId { get; set; }
        public string Username { get; set; }
        public string Email
        {
            get; set;
        }
    }
}

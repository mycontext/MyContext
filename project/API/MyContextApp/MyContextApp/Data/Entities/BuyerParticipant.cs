using System;

namespace MyContextApp.Data.Entities
{
    public class BuyerParticipant
    {
        public long Id { get; set; }
        public Guid UserId { get; set; }
        public string ReferenceNo { get; set; }
        public string ChainId { get; set; }
        public string Description { get; set; }
    }
}

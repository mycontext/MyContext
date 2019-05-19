using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Models
{
    public class PatientDto
    {
        public long Id { get; set; }
        public Guid UserId { get; set; }
        public string ReferenceNo { get; set; }
        public string ChainId { get; set; }
        public string Description { get; set; }
    }
}

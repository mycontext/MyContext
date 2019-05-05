using System;

namespace MyContextAPI.Model.Models
{
    public class PatientDTO : Resource
    { 
        public Guid ID { get; set; }
        public string PatientNo { get; set; }
        public string PatientReference { get; set; } 
    }
}

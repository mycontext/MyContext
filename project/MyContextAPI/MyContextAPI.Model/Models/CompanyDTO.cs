using System;

namespace MyContextAPI.Model.Models
{
    public class CompanyDTO:Resource
    {
        public Guid ID { get; set; }
        public string CompanyReferenceID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

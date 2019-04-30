using System;

namespace MyContextAPI.Model.Model
{
    public class HospitalDTO : Resource
    {
        public Guid ID { get; set; }
        public string HospitalReferenceID { get; set; }
        public string Name { get; set; }
        public int TypeID { get; set; }
    }
}

using System;

namespace MyContextAPI.Model.Model
{
    public class PatientDTO : Resource
    { 
        public string PatientNo { get; set; }
        public string CancerType { get; set; }
        public int CancerTypeID { get; set; }
    }
}

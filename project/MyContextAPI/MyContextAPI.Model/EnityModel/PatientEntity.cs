using System;
using System.Collections.Generic;
using System.Text;

namespace MyContextAPI.Model.EnityModel
{
      
    public class PatientEntity 
    {
        public Guid ID { get; set; }
        public string PatientNo { get; set; }
        public string CancerType { get; set; }
        public int CancerTypeID { get; set; }
    }
}

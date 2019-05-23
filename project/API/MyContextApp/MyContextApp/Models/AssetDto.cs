using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Models
{
    public class AssetDto
    {
        public Guid Id { get; set; }
        public string ReferenceNo { get; set; }
        public long PatientId { get; set; }
        public long RecorderId { get; set; }
        public string Description { get; set; }
        public string Result { get; set; }
        public DateTime DateCreated { get; set; }
        public string TreatmentPlan { get; set; }
    }
}

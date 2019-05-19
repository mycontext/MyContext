using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyContextApp.Data.Entities
{
    public class Asset
    {
        public long Id { get; set; }
        public string ReferenceNo { get; set; }
        public long PatientId { get; set; }
        public long RecorderId { get; set; }
        public string Description { get; set; }

    }
}

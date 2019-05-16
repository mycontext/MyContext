using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyContextAPI.Model.EnityModel
{
      
    public class PatientEntity 
    {
        public Guid ID { get; set; }
        public string PatientNo { get; set; }
        public string PatientReference { get; set; } 
    }
    public class Patient
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string PatientNo { get; set; }
        public string PatientReference { get; set; } 
    }
}

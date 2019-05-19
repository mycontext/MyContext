namespace MyContextApp.Data.Entities
{
    public class TransactionPatientToRecoder
    {
        public long Id { get; set; }
        public string ReferenceNo { get; set; }

        public long PatientId { get; set; }

        public long BuyerID { get; set; }
        public string Description { get; set; }

    }
}

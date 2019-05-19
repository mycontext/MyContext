namespace MyContextApp.Data.Entities
{
    public class TransactionPatientToBuyber
    {
        public long Id { get; set; }
        public long AssetId { get; set; }
        public long PatientId { get; set; }
        public long BuyerID { get; set; }
        public string ChainId { get; set; }
        public string Description { get; set; }

    }
}

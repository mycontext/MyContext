interface BuyerDto {
  id: number;
  userId: string;
  referenceNo: string;
  chainId: string;
  description: string;
  username: string;
  email: string;
}
interface AssetDto {
  id: number;  
  referenceNo: string;
  recorderId: number;
  patientId: number;
  description: string;
}
interface RecorderDto {
  id: number;
  userId: string;
  referenceNo: string;
  chainId: string;
  description: string;
  username: string;
  email: string;
}


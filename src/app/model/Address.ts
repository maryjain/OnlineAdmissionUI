export class Address {
  addid: bigint;
  addressline1: string;
  addressline2: string;
  addresstype: string;
  districtcode: number;
  pincode: number;
  profileid: bigint;
  sameaddress: boolean;

  constructor(addressline1: string,  addressline2: string, addresstype: string, districtcode: number, pincode: number,sameaddress:boolean , profileid: bigint) {
    this.addressline1 = addressline1;
    this.addressline2 = addressline2;
    this.addresstype = addresstype;
    this.districtcode = districtcode;
    this.pincode = pincode;
    this.sameaddress = sameaddress;
    this.profileid = profileid;
    }
}

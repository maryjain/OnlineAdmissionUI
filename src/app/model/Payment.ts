export class Payment {
  paymentid: bigint;
  transactionid: string;
  bank: string;
  applfees: number;
  profileid: bigint;
  updateddate:Date;
constructor(transactionid: string,  bank: string, applfees: number, profileid: bigint) {
  this.transactionid = transactionid;
  this.bank = bank;
  this.applfees = applfees;
  this.profileid = profileid;
  }
}

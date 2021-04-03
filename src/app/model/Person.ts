export class Person {
  profileid: bigint;
  fullname: string;
  dob: Date;
  emailid: string;
  mobileno: bigint;
  passwordplain: string;
  otp: number;


  constructor(fullname: string, dob: Date, emailid: string, mobileno: bigint, passwordplain: string) {
    this.fullname = fullname;
    this.dob = dob;
    this.emailid = emailid;
    this.mobileno = mobileno;
    this.passwordplain = passwordplain;
  }


}

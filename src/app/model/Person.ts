export class Person {
  profileid: bigint;
  fullname: string;
  dob: Date;
  emailid: string;
  mobileno: bigint;
  passwordplain: string;
  otp: number;
  enteredCaptcha: string;
  generatedCaptcha: string;
  fathername:string;
  mothername:string;
  guardianname:string;
  guardianmobileno:bigint;
  gender:string;
  nationality:string;
  state:string;
  religion:string;
  community:string;
  annualincome:number;
  creamylayer:boolean;
  applfees:number;
  physicalychallenged:boolean;
  stage:string;
  applstatus:string;
  status:string;
  reason:string;


  constructor(profileid: bigint, status: string, fullname: string, dob: Date, emailid: string, mobileno: bigint, passwordplain: string ) {
    this.fullname = fullname;
    this.dob = dob;
    this.emailid = emailid;
    this.mobileno = mobileno;
    this.passwordplain = passwordplain;
    this.profileid = profileid;
    this.status = status;
  }



}

export class Departmentuser {
  deptuserid: bigint;
  deptusername: string;
  emailid: string;
  passwordplain: string;

  constructor(deptusername: string, emailid: string,  passwordplain: string ) {
    this.deptusername = deptusername;
    this.emailid = emailid;
    this.passwordplain = passwordplain;

  }

}

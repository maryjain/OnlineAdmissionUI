export class Departmentuser {
  deptuserid: bigint;
  deptusername: string;
  emailid: string;
  passwordplain: string;

  constructor(deptusername: string,  passwordplain: string ) {
    this.deptusername = deptusername;

    this.passwordplain = passwordplain;

  }

}


export class Education {
  educaid: bigint;
  qualificationtype: string;
  institution: string;
  university: string;
  yearofpass: number;
  registrationno: string;
  cgpa: number;
  percentage: number;
  profileid: bigint;

constructor(qualificationtype: string,  institution: string, university: string, yearofpass: number, registrationno: string,cgpa:number , percentage: number,profileid:bigint) {
  this.qualificationtype = qualificationtype;
  this.institution = institution;
  this.university = university;
  this.yearofpass = yearofpass;
  this.registrationno = registrationno;
  this.cgpa = cgpa;
  this.percentage = percentage;
  this.profileid = profileid;
  }
}

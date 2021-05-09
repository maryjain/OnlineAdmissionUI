
export class Documentupload {
updateddate: Date;
documenttype: string;
documentformat: string;
converteddata: any;

constructor(documenttype: string, documentformat: string, updateddate: Date, converteddata: any ) {
  this.documenttype = documenttype;
  this.documentformat = documentformat;
  this.updateddate = updateddate;
  this.converteddata = converteddata;
}
}

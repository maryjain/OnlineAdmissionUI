import { Injectable } from '@angular/core';
import { SessionStorageModel } from 'src/app/model/SessionStorageModel';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  sessionStorageModel:SessionStorageModel=new SessionStorageModel();
constructor() { }

public set(key:string,value:string){
this.sessionStorageModel[key]=value;
}
get(key:string):string{
return this.sessionStorageModel[key]
}
remove(key:string){
this.sessionStorageModel[key]=null;
}
clear(){
this.sessionStorageModel=new SessionStorageModel();
}
}

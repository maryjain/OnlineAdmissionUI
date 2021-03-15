import { Directive } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
@Directive({
  selector: '[appCustomvalidatordirective]'
})
export class CustomvalidatordirectiveDirective  extends Validators{



}

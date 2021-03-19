import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class AppBlockCopyPasteDirective {

  constructor() { }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent): void {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent): void{
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent): void {
    e.preventDefault();
  }
}

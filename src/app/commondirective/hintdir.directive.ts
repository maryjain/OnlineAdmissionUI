import { Directive,HostListener, Input } from '@angular/core';

import {MatTooltip} from '@angular/material/tooltip'

@Directive({
  selector: '[appHintdir]',
  providers: [MatTooltip]
})
export class HintdirDirective {

  tooltip: MatTooltip;

  constructor(tooltip: MatTooltip) {
    this.tooltip = tooltip;
    this.tooltip.tooltipClass={"background-color":"#00ACC1 !important;"};
  }

  @HostListener('mouseover') mouseover() {
    this.tooltip.message = 'Range between 8-15 characters, contains atleast one capitial letter, one digit and one special character like ! @ # ? ] Note: do not use < or > in your password';

    this.tooltip.show();
  }

}

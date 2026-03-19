import { Component } from '@angular/core';
import { ButtonComponent, ButtonRowComponent, TooltipDirective } from '@kompakkt/komponents';

@Component({
  selector: 'example-tooltip',
  standalone: true,
  imports: [TooltipDirective, ButtonComponent, ButtonRowComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class ExampleTooltipComponent {}

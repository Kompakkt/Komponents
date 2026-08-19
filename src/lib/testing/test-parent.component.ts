import { Component, signal, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SliderComponent } from '../slider/slider.component';
import { LabelledCheckboxComponent } from '../labelled-checkbox/labelled-checkbox.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent } from '../select/select.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';

@Component({
  selector: 'k-test-parent',
  standalone: true,
  imports: [
    InputComponent,
    SliderComponent,
    LabelledCheckboxComponent,
    SlideToggleComponent,
    TextareaComponent,
    SelectComponent,
    MenuOptionComponent,
  ],
  template: `
    <k-input label="Name" [(value)]="name" />
    <k-slider label="Volume" [(value)]="volume" />
    <k-labelled-checkbox label="Active" [(checked)]="active" />
    <k-slide-toggle label="Toggle" [(checked)]="toggle" />
    <k-textarea label="Bio" [(value)]="bio" />
    <k-select label="Color" [(value)]="color">
      <k-menu-option value="red">Red</k-menu-option>
      <k-menu-option value="green">Green</k-menu-option>
      <k-menu-option value="blue">Blue</k-menu-option>
    </k-select>
  `,
})
export class TestParentComponent {
  name = signal('');
  volume = signal(0);
  active = signal(false);
  toggle = signal(false);
  bio = signal('');
  color = signal('');

  @ViewChild(InputComponent) inputComp!: InputComponent;
  @ViewChild(SliderComponent) sliderComp!: SliderComponent;
  @ViewChild(LabelledCheckboxComponent) checkboxComp!: LabelledCheckboxComponent;
  @ViewChild(SlideToggleComponent) toggleComp!: SlideToggleComponent;
  @ViewChild(TextareaComponent) textareaComp!: TextareaComponent;
  @ViewChild(SelectComponent) selectComp!: SelectComponent;
}

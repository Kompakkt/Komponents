import { Component, signal, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SliderComponent } from '../slider/slider.component';
import { LabelledCheckboxComponent } from '../labelled-checkbox/labelled-checkbox.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent } from '../select/select.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';

export interface TestFormData {
  name: string;
  volume: number;
  active: boolean;
  toggle: boolean;
  bio: string;
  color: string;
}

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
    <k-input label="Name" [startingValue]="form().name" (valueChanged)="onNameChange($event)" />
    <k-slider
      label="Volume"
      [startingValue]="form().volume"
      (valueChanged)="onVolumeChange($event)"
    />
    <k-labelled-checkbox
      label="Active"
      [startingValue]="form().active"
      (checkedChange)="onActiveChange($event)"
    />
    <k-slide-toggle
      label="Toggle"
      [startingValue]="form().toggle"
      (checkedChange)="onToggleChange($event)"
    />
    <k-textarea label="Bio" [startingValue]="form().bio" (valueChanged)="onBioChange($event)" />
    <k-select label="Color" [startingValue]="form().color" (valueChanged)="onColorChange($event)">
      <k-menu-option value="red">Red</k-menu-option>
      <k-menu-option value="green">Green</k-menu-option>
      <k-menu-option value="blue">Blue</k-menu-option>
    </k-select>
  `,
})
export class TestParentComponent {
  form = signal<TestFormData>({
    name: '',
    volume: 0,
    active: false,
    toggle: false,
    bio: '',
    color: '',
  });

  @ViewChild(InputComponent) inputComp!: InputComponent;
  @ViewChild(SliderComponent) sliderComp!: SliderComponent;
  @ViewChild(LabelledCheckboxComponent) checkboxComp!: LabelledCheckboxComponent;
  @ViewChild(SlideToggleComponent) toggleComp!: SlideToggleComponent;
  @ViewChild(TextareaComponent) textareaComp!: TextareaComponent;
  @ViewChild(SelectComponent) selectComp!: SelectComponent;

  onNameChange(e: { value: string }) {
    this.form.update(f => ({ ...f, name: e.value }));
  }

  onVolumeChange(v: number) {
    this.form.update(f => ({ ...f, volume: v }));
  }

  onActiveChange(v: boolean) {
    this.form.update(f => ({ ...f, active: v }));
  }

  onToggleChange(v: boolean) {
    this.form.update(f => ({ ...f, toggle: v }));
  }

  onBioChange(e: { value: string }) {
    this.form.update(f => ({ ...f, bio: e.value }));
  }

  onColorChange(v: string) {
    this.form.update(f => ({ ...f, color: v }));
  }
}

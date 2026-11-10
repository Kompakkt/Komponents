import { Component, signal } from '@angular/core';
import {
  FormField,
  form,
  maxLength,
  max,
  min,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import {
  InputComponent,
  LabelledCheckboxComponent,
  SelectComponent,
  MenuOptionComponent,
  SlideToggleComponent,
  SliderComponent,
  TextareaComponent,
} from '@kompakkt/komponents';

interface DemoModel {
  name: string;
  bio: string;
  role: string;
  experience: number;
  newsletter: boolean;
  acceptTerms: boolean;
}

@Component({
  selector: 'example-signal-forms',
  imports: [
    FormField,
    InputComponent,
    LabelledCheckboxComponent,
    SelectComponent,
    MenuOptionComponent,
    SlideToggleComponent,
    SliderComponent,
    TextareaComponent,
  ],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
})
export class ExampleSignalFormsComponent {
  readonly demoModel = signal<DemoModel>({
    name: '',
    bio: '',
    role: '',
    experience: 2,
    newsletter: true,
    acceptTerms: false,
  });

  readonly demoForm = form<DemoModel>(this.demoModel, path => {
    required(path.name, { message: 'Name is required' });
    minLength(path.name, 3, { message: 'Name must be at least 3 characters' });
    maxLength(path.bio, 200, { message: 'Bio must be at most 200 characters' });
    required(path.role, { message: 'Please pick a role' });
    min(path.experience, 0, { message: 'Experience cannot be negative' });
    max(path.experience, 20, { message: 'Experience cannot exceed 20 years' });
    validate(path.acceptTerms, ({ value }) =>
      value() ? null : { kind: 'required', message: 'You must accept the terms' },
    );
  });

  readonly submitted = signal(false);

  modelJson(): string {
    return JSON.stringify(this.demoModel(), null, 2);
  }

  onSubmit(): void {
    if (this.demoForm().invalid()) {
      this.demoForm().markAsTouched();
      return;
    }
    this.submitted.set(true);
  }

  onReset(): void {
    this.submitted.set(false);
    this.demoForm().reset({
      name: '',
      bio: '',
      role: '',
      experience: 2,
      newsletter: true,
      acceptTerms: false,
    });
  }
}

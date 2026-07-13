import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonRowComponent } from './button-row.component';

describe('ButtonRowComponent', () => {
  let fixture: ComponentFixture<ButtonRowComponent>;
  let component: ButtonRowComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have horizontal direction by default', () => {
    expect(component.direction()).toBe('horizontal');
    expect(fixture.nativeElement.classList.contains('vertical')).toBe(false);
  });

  it('should apply vertical class when direction is vertical', async () => {
    fixture.componentRef.setInput('direction', 'vertical');
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('vertical')).toBe(true);
  });

  it('should set justify style', async () => {
    fixture.componentRef.setInput('justify', 'center');
    await fixture.whenStable();
    expect(fixture.nativeElement.style.getPropertyValue('--justify')).toBe('center');
  });

  it('should set gap style', () => {
    expect(fixture.nativeElement.style.getPropertyValue('--gap')).toBe('8px');
  });
});

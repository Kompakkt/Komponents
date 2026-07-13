import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let fixture: ComponentFixture<DetailsComponent>;
  let component: DetailsComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the title', () => {
    const titleEl = fixture.nativeElement.querySelector('.details-header span:last-child');
    expect(titleEl.textContent).toContain('Test Title');
  });

  it('should start expanded by default', () => {
    expect(component.expanded()).toBe(true);
    expect(
      fixture.nativeElement.querySelector('.details-content-wrapper')?.classList.contains('opened'),
    ).toBe(true);
  });

  it('should toggle expanded state on header click', () => {
    const header = fixture.nativeElement.querySelector('.details-header');
    header.click();
    fixture.detectChanges();
    expect(component.expanded()).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.details-content-wrapper')?.classList.contains('opened'),
    ).toBe(false);
  });

  it('should start collapsed when startCollapsed is true', async () => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Collapsed');
    fixture.componentRef.setInput('startCollapsed', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.expanded()).toBe(false);
  });

  it('should not toggle when alwaysExpanded is true', async () => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Always');
    fixture.componentRef.setInput('alwaysExpanded', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.expanded()).toBe(true);
    const header = fixture.nativeElement.querySelector('.details-header');
    header.click();
    expect(component.expanded()).toBe(true);
  });
});

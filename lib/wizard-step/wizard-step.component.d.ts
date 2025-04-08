import { AfterViewInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WizardStepComponent implements AfterViewInit {
    label: import("@angular/core").InputSignal<string>;
    active: import("@angular/core").WritableSignal<boolean>;
    completed: import("@angular/core").WritableSignal<boolean>;
    counter: import("@angular/core").WritableSignal<number>;
    contentDiv: import("@angular/core").Signal<ElementRef<HTMLDivElement> | undefined>;
    contentHeight: import("@angular/core").WritableSignal<string>;
    headerClicked: import("@angular/core").OutputEmitterRef<void>;
    get isActiveStep(): boolean;
    get isCompletedStep(): boolean;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WizardStepComponent, "k-wizard-step", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; }, { "headerClicked": "headerClicked"; }, never, ["*"], true, never>;
}

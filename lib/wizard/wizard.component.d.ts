import { AfterViewInit, ElementRef } from "@angular/core";
import { WizardStepComponent } from "../wizard-step/wizard-step.component";
import * as i0 from "@angular/core";
export declare class WizardComponent implements AfterViewInit {
    #private;
    horizontalContentContainer: import("@angular/core").Signal<ElementRef<HTMLDivElement> | undefined>;
    direction: import("@angular/core").InputSignal<"horizontal" | "vertical">;
    linear: import("@angular/core").InputSignal<boolean>;
    steps: import("@angular/core").Signal<readonly WizardStepComponent[]>;
    stepIndex: import("@angular/core").Signal<number>;
    selectedStep: import("@angular/core").Signal<WizardStepComponent>;
    get isHorizontal(): boolean;
    get stepCount(): number;
    nextStep(): void;
    prevStep(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WizardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WizardComponent, "k-wizard", never, { "direction": { "alias": "direction"; "required": false; "isSignal": true; }; "linear": { "alias": "linear"; "required": false; "isSignal": true; }; }, {}, ["steps"], ["*"], true, never>;
}

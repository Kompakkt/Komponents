import { ElementRef } from "@angular/core";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
export declare class TextareaComponent {
    #private;
    textarea: import("@angular/core").Signal<ElementRef<HTMLTextAreaElement>>;
    label: import("@angular/core").InputSignal<string>;
    placeholder: import("@angular/core").InputSignal<string>;
    startingValue: import("@angular/core").InputSignal<string | undefined>;
    value: import("@angular/core").WritableSignal<string>;
    value$: import("rxjs").Observable<string>;
    valueChanged: import("@angular/core").OutputEmitterRef<{
        value: string;
    }>;
    prefix: import("@angular/core").InputSignal<string>;
    suffix: import("@angular/core").InputSignal<string>;
    minRows: import("@angular/core").InputSignal<string | number>;
    maxRows: import("@angular/core").InputSignal<string | number>;
    resize: import("@angular/core").InputSignal<"none" | "both" | "horizontal" | "vertical">;
    startingValueChangedEffect: import("@angular/core").EffectRef;
    valueSubscription?: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onValueChangeEvent(event: Event): void;
    get resizeStyle(): "none" | "both" | "horizontal" | "vertical";
    get minRowsStyle(): number;
    get maxRowsStyle(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextareaComponent, "k-textarea", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "startingValue": { "alias": "startingValue"; "required": false; "isSignal": true; }; "prefix": { "alias": "prefix"; "required": false; "isSignal": true; }; "suffix": { "alias": "suffix"; "required": false; "isSignal": true; }; "minRows": { "alias": "min-rows"; "required": false; "isSignal": true; }; "maxRows": { "alias": "max-rows"; "required": false; "isSignal": true; }; "resize": { "alias": "resize"; "required": false; "isSignal": true; }; }, { "valueChanged": "valueChanged"; }, never, never, true, never>;
}

import { OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
export type InputType = "text" | "number" | "username" | "password" | "email" | "tel" | "url";
export declare class InputComponent implements OnInit, OnDestroy {
    #private;
    min: import("@angular/core").InputSignal<number>;
    max: import("@angular/core").InputSignal<number>;
    label: import("@angular/core").InputSignal<string>;
    type: import("@angular/core").InputSignal<InputType>;
    placeholder: import("@angular/core").InputSignal<string>;
    startingValue: import("@angular/core").InputSignal<string | number | undefined>;
    value: import("@angular/core").WritableSignal<string>;
    valueChanged: import("@angular/core").OutputEmitterRef<{
        value: string;
        valueAsNumber: number;
    }>;
    prefix: import("@angular/core").InputSignal<string>;
    suffix: import("@angular/core").InputSignal<string>;
    setFocus(focused: boolean): void;
    focused: import("@angular/core").Signal<boolean>;
    valueSubscription?: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onValueChangeEvent(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputComponent, "k-input", never, { "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "startingValue": { "alias": "startingValue"; "required": false; "isSignal": true; }; "prefix": { "alias": "prefix"; "required": false; "isSignal": true; }; "suffix": { "alias": "suffix"; "required": false; "isSignal": true; }; }, { "valueChanged": "valueChanged"; }, never, never, true, never>;
}

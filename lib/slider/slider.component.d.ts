import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SliderComponent implements AfterViewInit, OnInit, OnDestroy {
    #private;
    label: import("@angular/core").InputSignal<string>;
    min: import("@angular/core").InputSignal<number>;
    max: import("@angular/core").InputSignal<number>;
    startingValue: import("@angular/core").InputSignal<number>;
    step: import("@angular/core").InputSignal<number>;
    value: import("@angular/core").WritableSignal<number>;
    value$: import("rxjs").Observable<number>;
    valueChanged: import("@angular/core").OutputEmitterRef<number>;
    startingValueChangedEffect: import("@angular/core").EffectRef;
    showInfo: import("@angular/core").InputSignal<boolean>;
    showTooltip: import("@angular/core").InputSignal<boolean>;
    railRef: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    handleRef: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    isDragging$: import("rxjs").Observable<boolean>;
    handlePosition: import("@angular/core").Signal<number>;
    valueSubscription?: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    get showInfoClass(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderComponent, "k-slider", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "startingValue": { "alias": "startingValue"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "showInfo": { "alias": "showInfo"; "required": false; "isSignal": true; }; "showTooltip": { "alias": "showTooltip"; "required": false; "isSignal": true; }; }, { "valueChanged": "valueChanged"; }, never, never, true, never>;
}

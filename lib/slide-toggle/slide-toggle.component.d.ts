import { OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
export declare class SlideToggleComponent implements OnInit, OnDestroy {
    label: import("@angular/core").InputSignal<string>;
    startingValue: import("@angular/core").InputSignal<boolean>;
    checkedChange: import("@angular/core").OutputEmitterRef<boolean>;
    checked: import("@angular/core").WritableSignal<boolean>;
    checked$: import("rxjs").Observable<boolean>;
    valueSubscription?: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    get active(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlideToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SlideToggleComponent, "k-slide-toggle", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "startingValue": { "alias": "startingValue"; "required": false; "isSignal": true; }; }, { "checkedChange": "checkedChange"; }, never, never, true, never>;
}

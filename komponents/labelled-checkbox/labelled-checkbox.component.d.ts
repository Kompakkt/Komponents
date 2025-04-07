import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LabelledCheckboxComponent implements OnInit, OnDestroy {
    #private;
    label: import("@angular/core").InputSignal<string>;
    startingValue: import("@angular/core").InputSignal<boolean>;
    checkedChange: import("@angular/core").OutputEmitterRef<boolean>;
    checked: import("@angular/core").WritableSignal<boolean>;
    checked$: import("rxjs").Observable<boolean>;
    checkedSubscription?: Subscription;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelledCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelledCheckboxComponent, "k-labelled-checkbox", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "startingValue": { "alias": "startingValue"; "required": false; "isSignal": true; }; }, { "checkedChange": "checkedChange"; }, never, never, true, never>;
}

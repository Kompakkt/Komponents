import { AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
type TooltipPosition = 'above' | 'below' | 'left' | 'right';
type State = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    text: string;
    position: TooltipPosition;
    padding: number;
};
export declare class TooltipComponent implements AfterViewInit {
    #private;
    state: import("@angular/core").InputSignal<State | undefined>;
    visible: import("@angular/core").WritableSignal<boolean>;
    transitionEnd$: import("rxjs").Observable<Event>;
    get isVisible(): string | false | undefined;
    get left(): number;
    get top(): number;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "k-tooltip", never, { "state": { "alias": "state"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export declare class TooltipDirective {
    #private;
    tooltip: import("@angular/core").InputSignal<string>;
    tooltipPosition: import("@angular/core").InputSignal<TooltipPosition>;
    tooltipPadding: import("@angular/core").InputSignal<number>;
    constructor();
    onMouseEnter(): void;
    onMouseLeave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipDirective, "[tooltip]", never, { "tooltip": { "alias": "tooltip"; "required": true; "isSignal": true; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; "isSignal": true; }; "tooltipPadding": { "alias": "tooltipPadding"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};

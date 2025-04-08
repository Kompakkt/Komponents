import { AfterViewInit, ElementRef } from "@angular/core";
import * as i0 from "@angular/core";
export declare class DetailsComponent implements AfterViewInit {
    title: import("@angular/core").InputSignal<string>;
    startCollapsed: import("@angular/core").InputSignal<boolean>;
    alwaysExpanded: import("@angular/core").InputSignal<boolean>;
    expanded: import("@angular/core").WritableSignal<boolean>;
    gap: import("@angular/core").InputSignal<number>;
    contentDiv: import("@angular/core").Signal<ElementRef<HTMLDivElement> | undefined>;
    contentHeight: import("@angular/core").WritableSignal<string>;
    toggle(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DetailsComponent, "k-details", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "startCollapsed": { "alias": "startCollapsed"; "required": false; "isSignal": true; }; "alwaysExpanded": { "alias": "alwaysExpanded"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

import { OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MenuComponent implements OnInit, OnDestroy {
    #private;
    label: import("@angular/core").InputSignal<string | undefined>;
    width: import("@angular/core").InputSignal<string | undefined>;
    get widthStyle(): string | undefined;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuComponent, "k-menu", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

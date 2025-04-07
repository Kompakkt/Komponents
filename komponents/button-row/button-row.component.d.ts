import { AfterContentInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ButtonRowComponent implements AfterContentInit {
    el: ElementRef<HTMLDivElement>;
    buttonCount: import("@angular/core").WritableSignal<number>;
    justify: import("@angular/core").InputSignal<"start" | "center" | "end" | "space-between" | "space-evenly">;
    gap: import("@angular/core").InputSignal<string | number>;
    ngAfterContentInit(): void;
    get _justify(): "start" | "center" | "end" | "space-between" | "space-evenly";
    get _gap(): string;
    get _buttonCount(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonRowComponent, "k-button-row", never, { "justify": { "alias": "justify"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

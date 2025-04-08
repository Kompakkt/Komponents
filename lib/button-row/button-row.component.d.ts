import { AfterContentInit, ElementRef } from "@angular/core";
import * as i0 from "@angular/core";
export declare class ButtonRowComponent implements AfterContentInit {
    el: ElementRef<HTMLDivElement>;
    buttonCount: import("@angular/core").WritableSignal<number>;
    justify: import("@angular/core").InputSignal<"start" | "center" | "end" | "space-between" | "space-evenly">;
    direction: import("@angular/core").InputSignal<"horizontal" | "vertical">;
    gap: import("@angular/core").InputSignal<string | number>;
    ngAfterContentInit(): void;
    get _justify(): "start" | "center" | "end" | "space-between" | "space-evenly";
    get _gap(): string;
    get _buttonCount(): number;
    get _direction(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonRowComponent, "k-button-row", never, { "justify": { "alias": "justify"; "required": false; "isSignal": true; }; "direction": { "alias": "direction"; "required": false; "isSignal": true; }; "gap": { "alias": "gap"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

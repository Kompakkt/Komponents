import { InputComponent } from "../input/input.component";
import * as i0 from "@angular/core";
export declare class AutocompleteComponent {
    maxHeight: import("@angular/core").InputSignal<string | number>;
    get maxHeightStyle(): string;
    inputElement: import("@angular/core").InputSignal<InputComponent>;
    opened: import("@angular/core").Signal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteComponent, "k-autocomplete", never, { "maxHeight": { "alias": "max-height"; "required": false; "isSignal": true; }; "inputElement": { "alias": "inputElement"; "required": true; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

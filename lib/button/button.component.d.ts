import * as i0 from "@angular/core";
export declare class ButtonComponent {
    #private;
    type: import("@angular/core").InputSignal<"solid-primary" | "solid-secondary" | "solid-accent" | "solid-warn" | "solid-transparent" | `solid---color-${string}` | `solid-rgb${string}` | `solid-#${string}` | "outlined-primary" | "outlined-secondary" | "outlined-accent" | "outlined-warn" | "outlined-transparent" | `outlined---color-${string}` | `outlined-rgb${string}` | `outlined-#${string}`>;
    disabled: import("@angular/core").InputSignal<boolean>;
    iconButton: import("@angular/core").InputSignal<string | undefined>;
    iconSize: import("@angular/core").InputSignal<number | undefined>;
    fullWidth: import("@angular/core").InputSignal<string | undefined>;
    get isIconButton(): boolean;
    get hostIconSize(): number | undefined;
    get isFullWidth(): boolean;
    get isSolid(): boolean;
    get isOutlined(): boolean;
    get isDisabled(): boolean;
    get hostColor(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "k-button", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "iconButton": { "alias": "icon-button"; "required": false; "isSignal": true; }; "iconSize": { "alias": "icon-size"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "full-width"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

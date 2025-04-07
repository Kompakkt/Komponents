import * as i0 from '@angular/core';
import { inject, ElementRef, signal, input, HostBinding, Component, computed, viewChild, output, effect, ViewContainerRef, HostListener, Directive, contentChildren } from '@angular/core';
import { interval, skip, merge, fromEvent, filter, map, distinctUntilChanged, combineLatest } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

class ButtonRowComponent {
    el = inject(ElementRef);
    buttonCount = signal(2);
    justify = input('space-evenly');
    gap = input(8);
    ngAfterContentInit() {
        const children = Array.from(this.el.nativeElement.children);
        this.buttonCount.set(children.length);
    }
    get _justify() {
        return this.justify();
    }
    get _gap() {
        return +this.gap() + 'px';
    }
    get _buttonCount() {
        return this.buttonCount();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: ButtonRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: ButtonRowComponent, isStandalone: true, selector: "k-button-row", inputs: { justify: { classPropertyName: "justify", publicName: "justify", isSignal: true, isRequired: false, transformFunction: null }, gap: { classPropertyName: "gap", publicName: "gap", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "style.--justify": "this._justify", "style.--gap": "this._gap", "style.--button-count": "this._buttonCount" } }, ngImport: i0, template: "<ng-content />\n", styles: [":host{--button-count: 2;--justify: space-evenly;--gap: 8px;display:flex;justify-content:var(--justify);gap:var(--gap);width:100%}@supports (width: stretch){:host{width:stretch}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: ButtonRowComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-button-row', imports: [], template: "<ng-content />\n", styles: [":host{--button-count: 2;--justify: space-evenly;--gap: 8px;display:flex;justify-content:var(--justify);gap:var(--gap);width:100%}@supports (width: stretch){:host{width:stretch}}\n"] }]
        }], propDecorators: { _justify: [{
                type: HostBinding,
                args: ['style.--justify']
            }], _gap: [{
                type: HostBinding,
                args: ['style.--gap']
            }], _buttonCount: [{
                type: HostBinding,
                args: ['style.--button-count']
            }] } });

const getColor = (color) => {
    if (!color)
        return 'currentColor';
    if (color.startsWith('rgb') || color.startsWith('#') || color === 'transparent') {
        return color;
    }
    if (color.startsWith('--color')) {
        return `var(${color}, currentColor)`;
    }
    return `var(--color-${color}, currentColor)`;
};
class ButtonComponent {
    type = input('solid-transparent');
    disabled = input(false);
    iconButton = input(undefined, { alias: 'icon-button' });
    iconSize = input(undefined, { alias: 'icon-size' });
    fullWidth = input(undefined, { alias: 'full-width' });
    #splitType = computed(() => {
        const type = this.type();
        const firstDashIndex = type.indexOf('-');
        const style = type.slice(0, firstDashIndex);
        const color = type.slice(firstDashIndex + 1);
        return [style, color];
    });
    #computedStyle = computed(() => this.#splitType().at(0));
    #computedColor = computed(() => getColor(this.#splitType().at(1)));
    get isIconButton() {
        return this.iconButton() !== undefined;
    }
    get hostIconSize() {
        return this.iconSize() !== undefined ? this.iconSize() : undefined;
    }
    get isFullWidth() {
        return this.fullWidth() !== undefined;
    }
    get isSolid() {
        return this.#computedStyle() === 'solid';
    }
    get isOutlined() {
        return this.#computedStyle() === 'outlined';
    }
    get isDisabled() {
        return this.disabled();
    }
    get hostColor() {
        return this.#computedColor();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: ButtonComponent, isStandalone: true, selector: "k-button", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, iconButton: { classPropertyName: "iconButton", publicName: "icon-button", isSignal: true, isRequired: false, transformFunction: null }, iconSize: { classPropertyName: "iconSize", publicName: "icon-size", isSignal: true, isRequired: false, transformFunction: null }, fullWidth: { classPropertyName: "fullWidth", publicName: "full-width", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.icon-button": "this.isIconButton", "style.--icon-size.px": "this.hostIconSize", "class.full-width": "this.isFullWidth", "class.solid": "this.isSolid", "class.outlined": "this.isOutlined", "class.disabled": "this.isDisabled", "style.--color": "this.hostColor" } }, ngImport: i0, template: "<ng-content />\n", styles: [":host{--color: white;--icon-size: 16px;display:flex;align-items:center;justify-content:center;text-align:center;text-wrap:balance;border-radius:4px;padding:8px 16px;font-size:var(--font-size-base);box-sizing:border-box;cursor:pointer;-webkit-user-select:none;user-select:none;line-height:1;transition:background-color .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out;position:relative}:host.solid{background:var(--color);color:#fff;border:solid 2px var(--color)}:host.outlined{background:transparent;color:var(--color);border:solid 2px var(--color)}:host.disabled:before{cursor:not-allowed;pointer-events:none;background-color:#7f7f7f80}:host:not(.icon-button) mat-icon{margin-right:8px}:host.icon-button{width:calc(var(--icon-size) * 2);height:calc(var(--icon-size) * 2);padding:0;border-radius:50%;font-size:var(--icon-size)}:host.icon-button .mat-icon{width:var(--icon-size);height:var(--icon-size);font-size:var(--icon-size);line-height:var(--icon-size)}:host.full-width{width:100%;padding:8px}:host:before,:host:after{content:\"\";display:block;position:absolute;top:-2px;left:-2px;width:calc(100% + 4px);height:calc(100% + 4px);background-color:transparent;border-radius:inherit;transition:background-color .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out}:host.icon-button:after{border-radius:50%}:host:hover:after{background-color:#fff3}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-button', standalone: true, template: "<ng-content />\n", styles: [":host{--color: white;--icon-size: 16px;display:flex;align-items:center;justify-content:center;text-align:center;text-wrap:balance;border-radius:4px;padding:8px 16px;font-size:var(--font-size-base);box-sizing:border-box;cursor:pointer;-webkit-user-select:none;user-select:none;line-height:1;transition:background-color .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out;position:relative}:host.solid{background:var(--color);color:#fff;border:solid 2px var(--color)}:host.outlined{background:transparent;color:var(--color);border:solid 2px var(--color)}:host.disabled:before{cursor:not-allowed;pointer-events:none;background-color:#7f7f7f80}:host:not(.icon-button) mat-icon{margin-right:8px}:host.icon-button{width:calc(var(--icon-size) * 2);height:calc(var(--icon-size) * 2);padding:0;border-radius:50%;font-size:var(--icon-size)}:host.icon-button .mat-icon{width:var(--icon-size);height:var(--icon-size);font-size:var(--icon-size);line-height:var(--icon-size)}:host.full-width{width:100%;padding:8px}:host:before,:host:after{content:\"\";display:block;position:absolute;top:-2px;left:-2px;width:calc(100% + 4px);height:calc(100% + 4px);background-color:transparent;border-radius:inherit;transition:background-color .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out}:host.icon-button:after{border-radius:50%}:host:hover:after{background-color:#fff3}\n"] }]
        }], propDecorators: { isIconButton: [{
                type: HostBinding,
                args: ['class.icon-button']
            }], hostIconSize: [{
                type: HostBinding,
                args: ['style.--icon-size.px']
            }], isFullWidth: [{
                type: HostBinding,
                args: ['class.full-width']
            }], isSolid: [{
                type: HostBinding,
                args: ['class.solid']
            }], isOutlined: [{
                type: HostBinding,
                args: ['class.outlined']
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }], hostColor: [{
                type: HostBinding,
                args: ['style.--color']
            }] } });

class DetailsComponent {
    title = input.required();
    startCollapsed = input(false);
    alwaysExpanded = input(false);
    expanded = signal(true);
    gap = input(8);
    contentDiv = viewChild('detailsContent');
    contentHeight = signal('auto');
    toggle() {
        if (!this.alwaysExpanded()) {
            this.expanded.set(!this.expanded());
        }
    }
    ngAfterViewInit() {
        // TODO: this should only be triggered if the content somehow changes height.
        // However, I could not get this to work with MutationObserver or ngChanges
        // - Kai
        const resize = () => requestAnimationFrame(() => {
            if (!this.expanded())
                return;
            const clientHeight = this.contentDiv()?.nativeElement.clientHeight;
            if (!clientHeight)
                return;
            const oldHeight = +this.contentHeight().replace('px', '').replace('auto', '0');
            if (clientHeight <= oldHeight)
                return;
            this.contentHeight.set(clientHeight + 'px');
        });
        resize();
        if (this.alwaysExpanded()) {
            this.expanded.set(true);
        }
        else if (this.startCollapsed()) {
            this.expanded.set(false);
        }
        interval(100).subscribe(() => resize());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: DetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.5", type: DetailsComponent, isStandalone: true, selector: "k-details", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, startCollapsed: { classPropertyName: "startCollapsed", publicName: "startCollapsed", isSignal: true, isRequired: false, transformFunction: null }, alwaysExpanded: { classPropertyName: "alwaysExpanded", publicName: "alwaysExpanded", isSignal: true, isRequired: false, transformFunction: null }, gap: { classPropertyName: "gap", publicName: "gap", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "contentDiv", first: true, predicate: ["detailsContent"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"details-header\" (click)=\"toggle()\">\n  <svg\n    xmlns=\"http://www.w3.org/2000/svg\"\n    height=\"24px\"\n    viewBox=\"0 0 24 24\"\n    width=\"24px\"\n    fill=\"currentColor\"\n    style=\"color: var(--color-primary)\"\n    [class.opened]=\"expanded()\"\n  >\n    <path d=\"M0 0h24v24H0V0z\" fill=\"none\" />\n    <path\n      d=\"M4 18.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99z\"\n    />\n  </svg>\n  <span>{{ title() }}</span>\n</div>\n\n<div\n  class=\"details-content\"\n  [class.opened]=\"expanded()\"\n  [style.--inner-height]=\"contentHeight()\"\n  [style.--gap.px]=\"gap()\"\n  #detailsContent\n>\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;background-color:var(--color-gray-dark);box-shadow:2px 2px 4px #0003;border-radius:4px;--transition-duration: 0s;--transition-easing: cubic-bezier(.45, 0, .55, 1)}:host>.details-header{min-height:32px;padding:12px;box-sizing:border-box;display:flex;align-items:center;gap:4px;border-radius:4px;cursor:pointer;-webkit-user-select:none;user-select:none}:host>.details-header:hover{background-color:#ffffff1a}:host .details-content{display:flex;flex-direction:column;align-items:stretch;max-height:0px;padding:0;overflow:hidden;gap:var(--gap);transition:max-height var(--transition-duration) var(--transition-easing),padding var(--transition-duration) var(--transition-easing)}:host .details-content.opened{max-height:var(--inner-height, auto);padding:16px}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: DetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-details', template: "<div class=\"details-header\" (click)=\"toggle()\">\n  <svg\n    xmlns=\"http://www.w3.org/2000/svg\"\n    height=\"24px\"\n    viewBox=\"0 0 24 24\"\n    width=\"24px\"\n    fill=\"currentColor\"\n    style=\"color: var(--color-primary)\"\n    [class.opened]=\"expanded()\"\n  >\n    <path d=\"M0 0h24v24H0V0z\" fill=\"none\" />\n    <path\n      d=\"M4 18.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99z\"\n    />\n  </svg>\n  <span>{{ title() }}</span>\n</div>\n\n<div\n  class=\"details-content\"\n  [class.opened]=\"expanded()\"\n  [style.--inner-height]=\"contentHeight()\"\n  [style.--gap.px]=\"gap()\"\n  #detailsContent\n>\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;background-color:var(--color-gray-dark);box-shadow:2px 2px 4px #0003;border-radius:4px;--transition-duration: 0s;--transition-easing: cubic-bezier(.45, 0, .55, 1)}:host>.details-header{min-height:32px;padding:12px;box-sizing:border-box;display:flex;align-items:center;gap:4px;border-radius:4px;cursor:pointer;-webkit-user-select:none;user-select:none}:host>.details-header:hover{background-color:#ffffff1a}:host .details-content{display:flex;flex-direction:column;align-items:stretch;max-height:0px;padding:0;overflow:hidden;gap:var(--gap);transition:max-height var(--transition-duration) var(--transition-easing),padding var(--transition-duration) var(--transition-easing)}:host .details-content.opened{max-height:var(--inner-height, auto);padding:16px}\n"] }]
        }] });

class InputComponent {
    min = input(0);
    max = input(100);
    label = input.required();
    type = input("text");
    placeholder = input("");
    startingValue = input();
    #startingValue$ = toObservable(this.startingValue);
    value = signal("");
    #value$ = toObservable(this.value).pipe(skip(1));
    valueChanged = output();
    prefix = input("");
    suffix = input("");
    #focused = signal(false);
    #focusTimeout;
    setFocus(focused) {
        if (this.#focusTimeout)
            clearTimeout(this.#focusTimeout);
        this.#focusTimeout = setTimeout(() => {
            this.#focused.set(focused);
        }, 100);
    }
    focused = computed(() => this.#focused());
    #updateValue(value) {
        if (this.type() === "number") {
            const cleanedValue = value.toString().replace(/[^0-9.]/g, "");
            const valueAsNumber = Number(cleanedValue);
            const clampedNumber = Math.min(Math.max(this.min(), valueAsNumber));
            this.value.set(clampedNumber.toString());
        }
        else {
            this.value.set(value.toString());
        }
    }
    valueSubscription;
    ngOnInit() {
        this.valueSubscription = this.#value$.subscribe((value) => {
            this.valueChanged.emit({
                value,
                valueAsNumber: Number(value),
            });
        });
        this.#startingValue$.subscribe((value) => {
            if (value === this.value())
                return;
            if (value !== undefined) {
                this.#updateValue(value);
            }
            else {
                this.#updateValue(this.type() === "number" ? this.min() : "");
            }
        });
    }
    ngOnDestroy() {
        this.valueSubscription?.unsubscribe();
    }
    onValueChangeEvent(event) {
        const el = event.target;
        this.#updateValue(el.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: InputComponent, isStandalone: true, selector: "k-input", inputs: { min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, startingValue: { classPropertyName: "startingValue", publicName: "startingValue", isSignal: true, isRequired: false, transformFunction: null }, prefix: { classPropertyName: "prefix", publicName: "prefix", isSignal: true, isRequired: false, transformFunction: null }, suffix: { classPropertyName: "suffix", publicName: "suffix", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { valueChanged: "valueChanged" }, ngImport: i0, template: "<span class=\"label\">{{ label() }}</span>\n<div\n    class=\"input-wrapper\"\n    [style.--pre-width]=\"prefixEl.clientWidth + 'px'\"\n    [style.--suf-width]=\"suffixEl.clientWidth + 'px'\"\n>\n    <span class=\"prefix\" #prefixEl>{{ prefix() }}</span>\n    <input\n        [type]=\"type() === 'number' ? 'text' : type()\"\n        [value]=\"value()\"\n        [placeholder]=\"placeholder()\"\n        (input)=\"onValueChangeEvent($event)\"\n        (change)=\"onValueChangeEvent($event)\"\n        (focus)=\"setFocus(true)\"\n        (blur)=\"setFocus(false)\"\n    />\n    <span class=\"suffix\" #suffixEl>{{ suffix() }} </span>\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;font-size:var(--font-size-base);color:#fff}:host span{font-style:normal;font-weight:var(--font-weight-normal);color:inherit}:host span.prefix,:host span.suffix{line-height:var(--font-size-base);font-size:var(--font-size-base)}:host span.prefix:empty,:host span.suffix:empty{display:none}:host input{width:100%;height:100%;outline:none;border:unset;appearance:none;color:inherit;background:transparent;font-size:inherit}:host div.input-wrapper{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:4px;border:1px solid var(--color-gray-12);background:var(--color-gray-dark)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: "k-input", imports: [], template: "<span class=\"label\">{{ label() }}</span>\n<div\n    class=\"input-wrapper\"\n    [style.--pre-width]=\"prefixEl.clientWidth + 'px'\"\n    [style.--suf-width]=\"suffixEl.clientWidth + 'px'\"\n>\n    <span class=\"prefix\" #prefixEl>{{ prefix() }}</span>\n    <input\n        [type]=\"type() === 'number' ? 'text' : type()\"\n        [value]=\"value()\"\n        [placeholder]=\"placeholder()\"\n        (input)=\"onValueChangeEvent($event)\"\n        (change)=\"onValueChangeEvent($event)\"\n        (focus)=\"setFocus(true)\"\n        (blur)=\"setFocus(false)\"\n    />\n    <span class=\"suffix\" #suffixEl>{{ suffix() }} </span>\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;font-size:var(--font-size-base);color:#fff}:host span{font-style:normal;font-weight:var(--font-weight-normal);color:inherit}:host span.prefix,:host span.suffix{line-height:var(--font-size-base);font-size:var(--font-size-base)}:host span.prefix:empty,:host span.suffix:empty{display:none}:host input{width:100%;height:100%;outline:none;border:unset;appearance:none;color:inherit;background:transparent;font-size:inherit}:host div.input-wrapper{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:4px;border:1px solid var(--color-gray-12);background:var(--color-gray-dark)}\n"] }]
        }] });

class LabelledCheckboxComponent {
    label = input.required();
    startingValue = input(false);
    #startingValue$ = toObservable(this.startingValue);
    checkedChange = output();
    checked = signal(false);
    checked$ = toObservable(this.checked);
    checkedSubscription;
    ngOnInit() {
        this.checkedSubscription = this.checked$.subscribe(value => {
            this.checkedChange.emit(value);
        });
        this.#startingValue$.subscribe(value => {
            if (value === this.checked())
                return;
            this.checked.set(value);
        });
    }
    ngOnDestroy() {
        this.checkedSubscription?.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: LabelledCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: LabelledCheckboxComponent, isStandalone: true, selector: "k-labelled-checkbox", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, startingValue: { classPropertyName: "startingValue", publicName: "startingValue", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checkedChange: "checkedChange" }, ngImport: i0, template: "<label>\n  <input type=\"checkbox\" hidden #checkbox (change)=\"checked.set(checkbox.checked)\" [checked]=\"checked()\" />\n  <svg viewBox=\"0 0 100 100\">\n    <path class=\"checkmark\" d=\"M20,50 L40,70 L80,30\" />\n  </svg>\n  <span>{{ label() }}</span>\n</label>\n", styles: [":host{--background-color: rgba(255, 255, 255, .1);--border-color: rgba(255, 255, 255, .2)}input[type=checkbox]{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;width:1px;overflow:hidden;position:absolute;white-space:nowrap}label{display:flex;flex-direction:row;align-items:center;gap:8px}svg{display:inline-block;height:1em;width:1em;border-width:2px;border-style:solid;border-radius:4px;border-color:var(--border-color);background:var(--background-color)}.checkmark{stroke-dasharray:100;stroke-dashoffset:100;stroke-width:8;stroke:#fff;fill:none}input:checked+svg{border-color:var(--color-primary);background:var(--color-primary);animation:boxChecked .2s ease forwards}input:checked+svg .checkmark{animation:checkmarkChecked .2s .1s ease forwards}input:not(:checked)+svg{animation:boxUnchecked .2s ease}input:not(:checked)+svg .checkmark{animation:checkmarkUnchecked .2s ease}@keyframes boxChecked{0%{border-color:var(--border-color);background:var(--background-color)}to{border-color:var(--color-primary);background:var(--color-primary)}}@keyframes checkmarkChecked{0%{stroke-dashoffset:100}to{stroke-dashoffset:0}}@keyframes boxUnchecked{0%{border-color:var(--color-primary);background:var(--color-primary)}to{border-color:var(--border-color);background:var(--background-color)}}@keyframes checkmarkUnchecked{0%{stroke-dashoffset:0}to{stroke-dashoffset:100}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: LabelledCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-labelled-checkbox', imports: [], template: "<label>\n  <input type=\"checkbox\" hidden #checkbox (change)=\"checked.set(checkbox.checked)\" [checked]=\"checked()\" />\n  <svg viewBox=\"0 0 100 100\">\n    <path class=\"checkmark\" d=\"M20,50 L40,70 L80,30\" />\n  </svg>\n  <span>{{ label() }}</span>\n</label>\n", styles: [":host{--background-color: rgba(255, 255, 255, .1);--border-color: rgba(255, 255, 255, .2)}input[type=checkbox]{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;width:1px;overflow:hidden;position:absolute;white-space:nowrap}label{display:flex;flex-direction:row;align-items:center;gap:8px}svg{display:inline-block;height:1em;width:1em;border-width:2px;border-style:solid;border-radius:4px;border-color:var(--border-color);background:var(--background-color)}.checkmark{stroke-dasharray:100;stroke-dashoffset:100;stroke-width:8;stroke:#fff;fill:none}input:checked+svg{border-color:var(--color-primary);background:var(--color-primary);animation:boxChecked .2s ease forwards}input:checked+svg .checkmark{animation:checkmarkChecked .2s .1s ease forwards}input:not(:checked)+svg{animation:boxUnchecked .2s ease}input:not(:checked)+svg .checkmark{animation:checkmarkUnchecked .2s ease}@keyframes boxChecked{0%{border-color:var(--border-color);background:var(--background-color)}to{border-color:var(--color-primary);background:var(--color-primary)}}@keyframes checkmarkChecked{0%{stroke-dashoffset:100}to{stroke-dashoffset:0}}@keyframes boxUnchecked{0%{border-color:var(--color-primary);background:var(--color-primary)}to{border-color:var(--border-color);background:var(--background-color)}}@keyframes checkmarkUnchecked{0%{stroke-dashoffset:0}to{stroke-dashoffset:100}}\n"] }]
        }] });

class SlideToggleComponent {
    label = input.required();
    startingValue = input(false);
    checkedChange = output();
    checked = signal(this.startingValue());
    checked$ = toObservable(this.checked).pipe(skip(1));
    valueSubscription;
    ngOnInit() {
        this.valueSubscription = this.checked$.subscribe(value => {
            this.checkedChange.emit(value);
        });
    }
    ngOnDestroy() {
        this.valueSubscription?.unsubscribe();
    }
    toggle() {
        this.checked.update(value => !value);
    }
    get active() {
        return this.checked();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: SlideToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: SlideToggleComponent, isStandalone: true, selector: "k-slide-toggle", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, startingValue: { classPropertyName: "startingValue", publicName: "startingValue", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { checkedChange: "checkedChange" }, host: { properties: { "class.active": "this.active" } }, ngImport: i0, template: "<div class=\"slide-toggle\" (click)=\"toggle()\">\n  <div class=\"slide-toggle-track\">\n    <div class=\"slide-toggle-thumb\"></div>\n  </div>\n  <div class=\"slide-toggle-label\">{{ label() }}</div>\n</div>\n", styles: [":host.active .slide-toggle-thumb{transform:translate(24px)}:host.active .slide-toggle-track{background-color:var(--color-primary)}.slide-toggle{display:inline-flex;align-items:center;cursor:pointer}.slide-toggle-track{width:40px;height:16px;background-color:#666;border-radius:10px;position:relative;transition:background-color .3s}.slide-toggle-thumb{width:20px;height:20px;background-color:#fff;border-radius:50%;position:absolute;top:-2px;left:-2px;transition:transform .3s}.slide-toggle-label{margin-left:8px}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: SlideToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-slide-toggle', imports: [], template: "<div class=\"slide-toggle\" (click)=\"toggle()\">\n  <div class=\"slide-toggle-track\">\n    <div class=\"slide-toggle-thumb\"></div>\n  </div>\n  <div class=\"slide-toggle-label\">{{ label() }}</div>\n</div>\n", styles: [":host.active .slide-toggle-thumb{transform:translate(24px)}:host.active .slide-toggle-track{background-color:var(--color-primary)}.slide-toggle{display:inline-flex;align-items:center;cursor:pointer}.slide-toggle-track{width:40px;height:16px;background-color:#666;border-radius:10px;position:relative;transition:background-color .3s}.slide-toggle-thumb{width:20px;height:20px;background-color:#fff;border-radius:50%;position:absolute;top:-2px;left:-2px;transition:transform .3s}.slide-toggle-label{margin-left:8px}\n"] }]
        }], propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });

class SliderComponent {
    label = input.required();
    min = input(0);
    max = input(100);
    startingValue = input(0);
    step = input(0.1);
    value = signal(0);
    value$ = toObservable(this.value).pipe(skip(2));
    valueChanged = output();
    startingValueChangedEffect = effect(() => this.value.set(this.startingValue() ?? ''), {
        allowSignalWrites: true,
    });
    showInfo = input(true);
    showTooltip = input(true);
    railRef = viewChild.required('rail');
    handleRef = viewChild.required('handle');
    isDragging$ = merge(fromEvent(document, 'mousedown').pipe(filter(event => event.target === this.handleRef().nativeElement)), fromEvent(document, 'mouseup')).pipe(map(event => event.type === 'mousedown'), distinctUntilChanged());
    handlePosition = computed(() => {
        return ((this.value() - this.min()) / (this.max() - this.min())) * 100;
    });
    valueSubscription;
    ngOnInit() {
        this.valueSubscription = this.value$.subscribe(value => {
            this.valueChanged.emit(value);
        });
    }
    ngOnDestroy() {
        this.valueSubscription?.unsubscribe();
    }
    ngAfterViewInit() {
        combineLatest([fromEvent(document, 'mousemove'), this.isDragging$])
            .pipe(filter(([_, isDragging]) => isDragging))
            .subscribe(([event]) => this.#updateValue(event));
        fromEvent(this.railRef().nativeElement, 'click').subscribe(event => this.#updateValue(event));
    }
    #updateValue(event) {
        const railElement = this.railRef().nativeElement;
        const railRect = railElement.getBoundingClientRect();
        const handleElement = this.handleRef().nativeElement;
        const handleRect = handleElement.getBoundingClientRect();
        const clickPosition = event.clientX - railRect.left - handleRect.width / 2;
        const newValue = this.min() +
            (clickPosition / (railRect.width - handleRect.width)) * (this.max() - this.min());
        const steppedValue = Math.round(newValue / this.step()) * this.step();
        const decimalPlacesOfStep = this.step().toString().split('.').at(1)?.length ?? 0;
        const roundedValue = parseFloat(steppedValue.toFixed(decimalPlacesOfStep));
        this.value.set(Math.min(Math.max(roundedValue, this.min()), this.max()));
    }
    get showInfoClass() {
        return this.showInfo();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.5", type: SliderComponent, isStandalone: true, selector: "k-slider", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, startingValue: { classPropertyName: "startingValue", publicName: "startingValue", isSignal: true, isRequired: false, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null }, showInfo: { classPropertyName: "showInfo", publicName: "showInfo", isSignal: true, isRequired: false, transformFunction: null }, showTooltip: { classPropertyName: "showTooltip", publicName: "showTooltip", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { valueChanged: "valueChanged" }, host: { properties: { "class.show-info": "this.showInfoClass" } }, viewQueries: [{ propertyName: "railRef", first: true, predicate: ["rail"], descendants: true, isSignal: true }, { propertyName: "handleRef", first: true, predicate: ["handle"], descendants: true, isSignal: true }], ngImport: i0, template: "<span class=\"label\">{{ label() }}</span>\n<div class=\"slider-container\" [class.show-info]=\"showInfo()\">\n  @if (showInfo()) {\n  <span class=\"info-value min\">{{ min() }}</span>\n  }\n  <div class=\"slider-rail\" #rail>\n    <div\n      #handle\n      class=\"slider-handle\"\n      [style.left.%]=\"handlePosition()\"\n      [class.dragging]=\"isDragging$ | async\"\n    >\n      @if (showTooltip()) {\n      <span class=\"slider-value-tooltip\">{{ value() }}</span>\n      }\n    </div>\n  </div>\n  @if (showInfo()) {\n  <span class=\"info-value max\">{{ max() }}</span>\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;color:#fff}.label{font-style:normal;font-weight:var(--font-weight-normal);-webkit-user-select:none;user-select:none}.slider-container{box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;line-height:1;gap:12px}.slider-container:not(.show-info){padding:0 12px}.info-value{pointer-events:none;font-size:var(--font-size-small);color:#ccc}.slider-rail{width:100%;height:48px;background-color:transparent;position:relative;cursor:pointer}.slider-rail:after{content:\"\";position:absolute;top:calc(50% - 2px);left:0;width:100%;height:4px;background-color:#ffffff1a;border-radius:4px;pointer-events:none}.slider-handle{width:20px;height:20px;background-color:#ccc;border-radius:50%;position:absolute;top:calc(50% - 10px);transform:translate(-50%);cursor:grab}.slider-handle .slider-value-tooltip{position:absolute;top:-4px;left:50%;transition:transform .3s cubic-bezier(.33,1,.68,1);transform:translate(-50%) translateY(-100%) scale(1);font-size:var(--font-size-small);background:#fff3;width:24px;height:24px;text-align:center;display:flex;justify-content:center;align-items:center;border-radius:50%;overflow:hidden;pointer-events:none;-webkit-user-select:none;user-select:none}.slider-handle:not(.dragging) .slider-value-tooltip{transform:translate(-50%) translateY(0) scale(0)}\n"], dependencies: [{ kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-slider', imports: [AsyncPipe], template: "<span class=\"label\">{{ label() }}</span>\n<div class=\"slider-container\" [class.show-info]=\"showInfo()\">\n  @if (showInfo()) {\n  <span class=\"info-value min\">{{ min() }}</span>\n  }\n  <div class=\"slider-rail\" #rail>\n    <div\n      #handle\n      class=\"slider-handle\"\n      [style.left.%]=\"handlePosition()\"\n      [class.dragging]=\"isDragging$ | async\"\n    >\n      @if (showTooltip()) {\n      <span class=\"slider-value-tooltip\">{{ value() }}</span>\n      }\n    </div>\n  </div>\n  @if (showInfo()) {\n  <span class=\"info-value max\">{{ max() }}</span>\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;color:#fff}.label{font-style:normal;font-weight:var(--font-weight-normal);-webkit-user-select:none;user-select:none}.slider-container{box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;line-height:1;gap:12px}.slider-container:not(.show-info){padding:0 12px}.info-value{pointer-events:none;font-size:var(--font-size-small);color:#ccc}.slider-rail{width:100%;height:48px;background-color:transparent;position:relative;cursor:pointer}.slider-rail:after{content:\"\";position:absolute;top:calc(50% - 2px);left:0;width:100%;height:4px;background-color:#ffffff1a;border-radius:4px;pointer-events:none}.slider-handle{width:20px;height:20px;background-color:#ccc;border-radius:50%;position:absolute;top:calc(50% - 10px);transform:translate(-50%);cursor:grab}.slider-handle .slider-value-tooltip{position:absolute;top:-4px;left:50%;transition:transform .3s cubic-bezier(.33,1,.68,1);transform:translate(-50%) translateY(-100%) scale(1);font-size:var(--font-size-small);background:#fff3;width:24px;height:24px;text-align:center;display:flex;justify-content:center;align-items:center;border-radius:50%;overflow:hidden;pointer-events:none;-webkit-user-select:none;user-select:none}.slider-handle:not(.dragging) .slider-value-tooltip{transform:translate(-50%) translateY(0) scale(0)}\n"] }]
        }], propDecorators: { showInfoClass: [{
                type: HostBinding,
                args: ['class.show-info']
            }] } });

class TextareaComponent {
    textarea = viewChild.required('textarea');
    label = input.required();
    placeholder = input('');
    startingValue = input();
    value = signal('');
    value$ = toObservable(this.value).pipe(skip(2));
    valueChanged = output();
    prefix = input('');
    suffix = input('');
    minRows = input(4, { alias: 'min-rows' });
    maxRows = input(24, { alias: 'max-rows' });
    resize = input('vertical', { alias: 'resize' });
    startingValueChangedEffect = effect(() => this.#updateValue(this.startingValue() ?? ''), {
        allowSignalWrites: true,
    });
    #updateValue(value) {
        this.value.set(value.toString());
    }
    valueSubscription;
    ngOnInit() {
        this.valueSubscription = this.value$.subscribe(value => {
            this.valueChanged.emit({
                value,
            });
        });
    }
    ngOnDestroy() {
        this.valueSubscription?.unsubscribe();
    }
    onValueChangeEvent(event) {
        const el = event.target;
        this.#updateValue(el.value);
    }
    get resizeStyle() {
        return this.resize();
    }
    get minRowsStyle() {
        return +this.minRows();
    }
    get maxRowsStyle() {
        return +this.maxRows();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.5", type: TextareaComponent, isStandalone: true, selector: "k-textarea", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, startingValue: { classPropertyName: "startingValue", publicName: "startingValue", isSignal: true, isRequired: false, transformFunction: null }, prefix: { classPropertyName: "prefix", publicName: "prefix", isSignal: true, isRequired: false, transformFunction: null }, suffix: { classPropertyName: "suffix", publicName: "suffix", isSignal: true, isRequired: false, transformFunction: null }, minRows: { classPropertyName: "minRows", publicName: "min-rows", isSignal: true, isRequired: false, transformFunction: null }, maxRows: { classPropertyName: "maxRows", publicName: "max-rows", isSignal: true, isRequired: false, transformFunction: null }, resize: { classPropertyName: "resize", publicName: "resize", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { valueChanged: "valueChanged" }, host: { properties: { "style.--resize": "this.resizeStyle", "style.--min-rows": "this.minRowsStyle", "style.--max-rows": "this.maxRowsStyle" } }, viewQueries: [{ propertyName: "textarea", first: true, predicate: ["textarea"], descendants: true, isSignal: true }], ngImport: i0, template: "<span class=\"label\">{{ label() }}</span>\n<div class=\"textarea-wrapper\">\n  <textarea\n    #textarea\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    (input)=\"onValueChangeEvent($event)\"\n    (change)=\"onValueChangeEvent($event)\"\n  ></textarea>\n</div>\n", styles: [":host{--min-rows: 4;--max-rows: 24;--resize: vertical;display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;font-size:var(--font-size-base);color:#fff}:host span{font-size:var(--font-size-base);font-style:normal;font-weight:var(--font-weight-normal);line-height:var(--font-size-base);color:inherit}:host .textarea-wrapper{width:100%;height:100%;flex-grow:1;border-radius:4px;border:1px solid var(--color-gray-12);background:var(--color-gray-dark);padding:12px 8px;box-sizing:border-box;display:flex;flex-direction:column;align-items:stretch}:host textarea{font-size:var(--font-size-base);width:100%;height:100%;min-height:calc(24px + 16px * var(--min-rows) * 1.25);max-height:calc(24px + 16px * var(--max-rows) * 1.25);min-width:100%;outline:none;appearance:none;color:inherit;line-height:1.25;resize:var(--resize);flex-grow:1;word-wrap:unset;white-space:nowrap;background-color:transparent;border:unset;outline:unset;box-sizing:border-box;overflow:hidden}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-textarea', imports: [], template: "<span class=\"label\">{{ label() }}</span>\n<div class=\"textarea-wrapper\">\n  <textarea\n    #textarea\n    [value]=\"value()\"\n    [placeholder]=\"placeholder()\"\n    (input)=\"onValueChangeEvent($event)\"\n    (change)=\"onValueChangeEvent($event)\"\n  ></textarea>\n</div>\n", styles: [":host{--min-rows: 4;--max-rows: 24;--resize: vertical;display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:8px 0;font-family:Open Sans;font-size:var(--font-size-base);color:#fff}:host span{font-size:var(--font-size-base);font-style:normal;font-weight:var(--font-weight-normal);line-height:var(--font-size-base);color:inherit}:host .textarea-wrapper{width:100%;height:100%;flex-grow:1;border-radius:4px;border:1px solid var(--color-gray-12);background:var(--color-gray-dark);padding:12px 8px;box-sizing:border-box;display:flex;flex-direction:column;align-items:stretch}:host textarea{font-size:var(--font-size-base);width:100%;height:100%;min-height:calc(24px + 16px * var(--min-rows) * 1.25);max-height:calc(24px + 16px * var(--max-rows) * 1.25);min-width:100%;outline:none;appearance:none;color:inherit;line-height:1.25;resize:var(--resize);flex-grow:1;word-wrap:unset;white-space:nowrap;background-color:transparent;border:unset;outline:unset;box-sizing:border-box;overflow:hidden}\n"] }]
        }], propDecorators: { resizeStyle: [{
                type: HostBinding,
                args: ['style.--resize']
            }], minRowsStyle: [{
                type: HostBinding,
                args: ['style.--min-rows']
            }], maxRowsStyle: [{
                type: HostBinding,
                args: ['style.--max-rows']
            }] } });

class TooltipComponent {
    state = input();
    visible = signal(false);
    #elRef = inject(ElementRef);
    #firstStateChange$ = toObservable(this.state).pipe(filter((state) => state !== undefined));
    transitionEnd$ = fromEvent(this.#elRef.nativeElement, 'transitionend').pipe(filter(() => !this.visible()));
    get isVisible() {
        return this.visible() && this.state()?.text;
    }
    get left() {
        const state = this.state();
        if (!state)
            return 0;
        const { x1, x2, padding, position } = state;
        const tooltipWidth = this.#elRef.nativeElement.offsetWidth;
        switch (position) {
            case 'left':
                return x1 - tooltipWidth - padding;
            case 'right':
                return x2 + padding;
            default:
                return x1 + (x2 - x1) / 2 - tooltipWidth / 2;
        }
    }
    get top() {
        const state = this.state();
        if (!state)
            return 0;
        const { y1, y2, padding, position } = state;
        const tooltipHeight = this.#elRef.nativeElement.offsetHeight;
        switch (position) {
            case 'above':
                return y1 - tooltipHeight - padding;
            case 'below':
                return y2 + padding;
            default:
                return y1 + (y2 - y1) / 2 - tooltipHeight / 2;
        }
    }
    ngAfterViewInit() {
        this.#firstStateChange$.subscribe(() => {
            this.visible.set(true);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: TooltipComponent, isStandalone: true, selector: "k-tooltip", inputs: { state: { classPropertyName: "state", publicName: "state", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.visible": "this.isVisible", "style.left.px": "this.left", "style.top.px": "this.top" } }, ngImport: i0, template: '{{ state()?.text }}', isInline: true, styles: [":host{--padding: 8px;position:fixed;text-align:center;background-color:var(--color-bg-transparent);color:#fff;padding:5px 10px;border-radius:4px;font-size:var(--font-size-small);z-index:1000;pointer-events:none;transition-property:opacity;transition-duration:.2s;transition-timing-function:ease-in-out;opacity:0}:host.visible{opacity:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-tooltip', template: '{{ state()?.text }}', standalone: true, styles: [":host{--padding: 8px;position:fixed;text-align:center;background-color:var(--color-bg-transparent);color:#fff;padding:5px 10px;border-radius:4px;font-size:var(--font-size-small);z-index:1000;pointer-events:none;transition-property:opacity;transition-duration:.2s;transition-timing-function:ease-in-out;opacity:0}:host.visible{opacity:1}\n"] }]
        }], propDecorators: { isVisible: [{
                type: HostBinding,
                args: ['class.visible']
            }], left: [{
                type: HostBinding,
                args: ['style.left.px']
            }], top: [{
                type: HostBinding,
                args: ['style.top.px']
            }] } });
class TooltipDirective {
    tooltip = input.required();
    tooltipPosition = input('above');
    tooltipPadding = input(12);
    // #appRef = inject(ApplicationRef);
    #elRef = inject(ElementRef);
    #viewContainerRef = inject(ViewContainerRef);
    #tooltipComponentRef;
    constructor() {
        // Move the tooltip component to the root of the app, so it can be positioned absolutely
        // const appRoot = this.#appRef.components[0].location.nativeElement as HTMLElement;
        this.#tooltipComponentRef = this.#viewContainerRef.createComponent(TooltipComponent);
        // appRoot.append(this.#tooltipComponentRef.location.nativeElement);
    }
    onMouseEnter() {
        const { left, top, width, height } = this.#elRef.nativeElement.getBoundingClientRect();
        this.#tooltipComponentRef?.setInput('state', {
            text: this.tooltip(),
            position: this.tooltipPosition(),
            x1: left,
            x2: left + width,
            y1: top,
            y2: top + height,
            padding: this.tooltipPadding(),
        });
        this.#tooltipComponentRef?.instance.visible.set(true);
    }
    onMouseLeave() {
        this.#tooltipComponentRef?.instance.visible.set(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.5", type: TooltipDirective, isStandalone: true, selector: "[tooltip]", inputs: { tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: true, transformFunction: null }, tooltipPosition: { classPropertyName: "tooltipPosition", publicName: "tooltipPosition", isSignal: true, isRequired: false, transformFunction: null }, tooltipPadding: { classPropertyName: "tooltipPadding", publicName: "tooltipPadding", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                    standalone: true,
                }]
        }], ctorParameters: () => [], propDecorators: { onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });

class WizardStepComponent {
    label = input.required();
    active = signal(false);
    completed = signal(false);
    counter = signal(0);
    contentDiv = viewChild('stepContent');
    contentHeight = signal('auto');
    headerClicked = output();
    get isActiveStep() {
        return this.active();
    }
    get isCompletedStep() {
        return this.completed();
    }
    ngAfterViewInit() {
        // TODO: this should only be triggered if the content somehow changes height.
        // However, I could not get this to work with MutationObserver or ngChanges
        // - Kai
        const resize = () => requestAnimationFrame(() => {
            if (!this.active())
                return;
            const clientHeight = this.contentDiv()?.nativeElement.clientHeight;
            if (!clientHeight)
                return;
            const oldHeight = +this.contentHeight().replace('px', '').replace('auto', '0');
            if (clientHeight <= oldHeight)
                return;
            this.contentHeight.set(clientHeight + 'px');
        });
        resize();
        interval(100).subscribe(() => resize());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: WizardStepComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.5", type: WizardStepComponent, isStandalone: true, selector: "k-wizard-step", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { headerClicked: "headerClicked" }, host: { properties: { "class.step-active": "this.isActiveStep", "class.step-completed": "this.isCompletedStep" } }, viewQueries: [{ propertyName: "contentDiv", first: true, predicate: ["stepContent"], descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"wizard-step-label\" (click)=\"headerClicked.emit()\">\n  <div class=\"wizard-step-counter\">\n    {{ counter() }}\n  </div>\n  <span>{{ label() }}</span>\n</div>\n<div class=\"wizard-step-content\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;--transition-duration: 0s;--transition-easing: cubic-bezier(.45, 0, .55, 1)}:host.step-completed .wizard-step-label .wizard-step-counter,:host.step-active .wizard-step-label .wizard-step-counter{background-color:var(--color-primary)}:host.step-active .wizard-step-content{max-height:var(--inner-height, auto);padding:12px}.wizard-step-content{max-height:0px;padding:0;overflow:hidden;transition:max-height var(--transition-duration) var(--transition-easing),padding var(--transition-duration) var(--transition-easing)}.wizard-step-label{display:flex;flex-direction:row;align-items:center;gap:8px;min-height:32px;padding:12px;border-radius:4px;cursor:pointer;-webkit-user-select:none;user-select:none}.wizard-step-label:hover{background-color:#ffffff1a}.wizard-step-label div.wizard-step-counter{width:24px;height:24px;background-color:#ccc;color:#fff;font-weight:var(--font-weight-normal);font-family:monospace;font-size:var(--font-size-base);line-height:1;border-radius:50%;display:flex;justify-content:center;align-items:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: WizardStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-wizard-step', imports: [], template: "<div class=\"wizard-step-label\" (click)=\"headerClicked.emit()\">\n  <div class=\"wizard-step-counter\">\n    {{ counter() }}\n  </div>\n  <span>{{ label() }}</span>\n</div>\n<div class=\"wizard-step-content\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:stretch;--transition-duration: 0s;--transition-easing: cubic-bezier(.45, 0, .55, 1)}:host.step-completed .wizard-step-label .wizard-step-counter,:host.step-active .wizard-step-label .wizard-step-counter{background-color:var(--color-primary)}:host.step-active .wizard-step-content{max-height:var(--inner-height, auto);padding:12px}.wizard-step-content{max-height:0px;padding:0;overflow:hidden;transition:max-height var(--transition-duration) var(--transition-easing),padding var(--transition-duration) var(--transition-easing)}.wizard-step-label{display:flex;flex-direction:row;align-items:center;gap:8px;min-height:32px;padding:12px;border-radius:4px;cursor:pointer;-webkit-user-select:none;user-select:none}.wizard-step-label:hover{background-color:#ffffff1a}.wizard-step-label div.wizard-step-counter{width:24px;height:24px;background-color:#ccc;color:#fff;font-weight:var(--font-weight-normal);font-family:monospace;font-size:var(--font-size-base);line-height:1;border-radius:50%;display:flex;justify-content:center;align-items:center}\n"] }]
        }], propDecorators: { isActiveStep: [{
                type: HostBinding,
                args: ['class.step-active']
            }], isCompletedStep: [{
                type: HostBinding,
                args: ['class.step-completed']
            }] } });

class WizardComponent {
    direction = input('horizontal');
    linear = input(false);
    steps = contentChildren(WizardStepComponent);
    #stepIndex = signal(0);
    stepIndex = computed(() => {
        const index = this.#stepIndex();
        return this.steps().length % index;
    });
    selectedStep = computed(() => {
        const index = this.#stepIndex();
        const length = this.steps().length;
        return this.steps().at(index % length);
    });
    #setSelectedStep(nextStep) {
        const steps = this.steps();
        for (const step of steps) {
            step.active.set(false);
        }
        const nextStepIndex = steps.findIndex(step => step.label() === nextStep.label());
        nextStep.active.set(true);
        this.#stepIndex.set(nextStepIndex);
    }
    #updateStepCounters() {
        const steps = this.steps();
        for (let i = 0; i < steps.length; i++) {
            steps[i].counter.set(i + 1);
        }
    }
    #setupListeners() {
        const steps = this.steps();
        for (let i = 0; i < steps.length; i++) {
            steps[i].headerClicked.subscribe(() => {
                // console.log('Header clicked', i, steps[i], steps[i].label());
                if (!this.linear()) {
                    this.#setSelectedStep(steps[i]);
                }
            });
        }
    }
    nextStep() {
        if (this.#stepIndex() < this.steps().length - 1) {
            this.#stepIndex.update(step => step + 1);
            this.#setSelectedStep(this.selectedStep());
        }
    }
    prevStep() {
        if (this.#stepIndex() > 0) {
            this.#stepIndex.update(step => step - 1);
            this.#setSelectedStep(this.selectedStep());
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.#updateStepCounters();
            this.#setupListeners();
            this.#setSelectedStep(this.selectedStep());
        }, 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: WizardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.5", type: WizardComponent, isStandalone: true, selector: "k-wizard", inputs: { direction: { classPropertyName: "direction", publicName: "direction", isSignal: true, isRequired: false, transformFunction: null }, linear: { classPropertyName: "linear", publicName: "linear", isSignal: true, isRequired: false, transformFunction: null } }, queries: [{ propertyName: "steps", predicate: WizardStepComponent, isSignal: true }], ngImport: i0, template: "<ng-content />\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: WizardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-wizard', imports: [], template: "<ng-content />\n" }]
        }] });

class MenuOptionComponent {
    disabled = input();
    get disabledClass() {
        return typeof this.disabled() === 'string';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: MenuOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.5", type: MenuOptionComponent, isStandalone: true, selector: "k-menu-option", inputs: { disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.disabled": "this.disabledClass" } }, ngImport: i0, template: "<ng-content />\n", styles: [":host{display:flex;align-items:center;height:36px;margin-left:-8px;margin-right:-8px;padding:0 8px;box-sizing:border-box}:host:not(.disabled):hover,:host:not(.disabled):focus,:host:not(.disabled):focus-within{cursor:pointer;background-color:var(--color-bg-transparent)}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: MenuOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-menu-option', standalone: true, imports: [], template: "<ng-content />\n", styles: [":host{display:flex;align-items:center;height:36px;margin-left:-8px;margin-right:-8px;padding:0 8px;box-sizing:border-box}:host:not(.disabled):hover,:host:not(.disabled):focus,:host:not(.disabled):focus-within{cursor:pointer;background-color:var(--color-bg-transparent)}\n"] }]
        }], propDecorators: { disabledClass: [{
                type: HostBinding,
                args: ['class.disabled']
            }] } });

class MenuComponent {
    label = input();
    width = input();
    get widthStyle() {
        return this.width() ? `${this.width()}px` : undefined;
    }
    #elementRef = inject(ElementRef);
    #subscriptions = new Array();
    ngOnInit() {
        const parentElement = this.#elementRef.nativeElement.parentElement;
        if (!parentElement)
            return;
        parentElement.style.position = 'relative';
        this.#subscriptions.push(fromEvent(parentElement, 'mouseenter').subscribe(() => {
            this.#elementRef.nativeElement.classList.add('show');
        }), fromEvent(parentElement, 'focus').subscribe(() => {
            this.#elementRef.nativeElement.classList.add('show');
        }), fromEvent(parentElement, 'mouseleave').subscribe(() => {
            this.#elementRef.nativeElement.classList.remove('show');
        }), fromEvent(parentElement, 'blur').subscribe(() => {
            this.#elementRef.nativeElement.classList.remove('show');
        }));
    }
    ngOnDestroy() {
        this.#subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: MenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.5", type: MenuComponent, isStandalone: true, selector: "k-menu", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "style.--width": "this.widthStyle" } }, ngImport: i0, template: "@if (label(); as label) {\n  <k-menu-option disabled>\n    <span\n      ><strong>{{ label }}</strong></span\n    >\n  </k-menu-option>\n}\n\n<div class=\"k-menu-options\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;cursor:default;pointer-events:none;flex-direction:column;position:absolute;bottom:50%;right:50%;transform:translate(100%) translateY(calc(100% - 16px));background-color:var(--color-gray-dark);margin:0;padding:0 8px;width:var(--width, 200px);border-radius:4px;box-shadow:0 0 4px 2px var(--color-bg-solid);z-index:1;align-items:stretch;filter:opacity(0);transition:transform .2s ease-out,filter .2s ease-out;text-align:left;font-size:var(--font-size-small)}:host.show{pointer-events:all;filter:opacity(1);transform:translate(100%) translateY(100%)}.k-menu-options{display:flex;flex-direction:column;align-items:stretch}\n"], dependencies: [{ kind: "component", type: MenuOptionComponent, selector: "k-menu-option", inputs: ["disabled"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.5", ngImport: i0, type: MenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'k-menu', standalone: true, imports: [MenuOptionComponent], template: "@if (label(); as label) {\n  <k-menu-option disabled>\n    <span\n      ><strong>{{ label }}</strong></span\n    >\n  </k-menu-option>\n}\n\n<div class=\"k-menu-options\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;cursor:default;pointer-events:none;flex-direction:column;position:absolute;bottom:50%;right:50%;transform:translate(100%) translateY(calc(100% - 16px));background-color:var(--color-gray-dark);margin:0;padding:0 8px;width:var(--width, 200px);border-radius:4px;box-shadow:0 0 4px 2px var(--color-bg-solid);z-index:1;align-items:stretch;filter:opacity(0);transition:transform .2s ease-out,filter .2s ease-out;text-align:left;font-size:var(--font-size-small)}:host.show{pointer-events:all;filter:opacity(1);transform:translate(100%) translateY(100%)}.k-menu-options{display:flex;flex-direction:column;align-items:stretch}\n"] }]
        }], propDecorators: { widthStyle: [{
                type: HostBinding,
                args: ['style.--width']
            }] } });

/*
 * Public API Surface of komponents
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent, ButtonRowComponent, DetailsComponent, InputComponent, LabelledCheckboxComponent, MenuComponent, MenuOptionComponent, SlideToggleComponent, SliderComponent, TextareaComponent, TooltipComponent, TooltipDirective, WizardComponent, WizardStepComponent };
//# sourceMappingURL=komponents.mjs.map

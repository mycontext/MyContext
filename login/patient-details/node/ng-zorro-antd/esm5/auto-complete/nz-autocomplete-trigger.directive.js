/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { forwardRef, Directive, ElementRef, Inject, Input, Optional, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge } from 'rxjs';
import { delay, distinct, map } from 'rxjs/operators';
import { NzAutocompleteComponent } from './nz-autocomplete.component';
/** @type {?} */
export var NZ_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return NzAutocompleteTriggerDirective; })),
    multi: true
};
/**
 * @return {?}
 */
export function getNzAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `nz-autocomplete`. ' +
        'Make sure that the id passed to the `nzAutocomplete` is correct and that ' +
        "you're attempting to open it after the ngAfterContentInit hook.");
}
var NzAutocompleteTriggerDirective = /** @class */ (function () {
    function NzAutocompleteTriggerDirective(elementRef, _overlay, viewContainerRef, document) {
        this.elementRef = elementRef;
        this._overlay = _overlay;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        // tslint:disable-next-line:no-any
        this._onChange = (/**
         * @return {?}
         */
        function () { });
        this._onTouched = (/**
         * @return {?}
         */
        function () { });
        this.panelOpen = false;
    }
    Object.defineProperty(NzAutocompleteTriggerDirective.prototype, "activeOption", {
        /** Current active option */
        get: /**
         * Current active option
         * @return {?}
         */
        function () {
            if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
                return this.nzAutocomplete.activeItem;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyPanel();
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @param {?} value
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.writeValue = 
    // tslint:disable-next-line:no-any
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setTriggerValue(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        element.disabled = isDisabled;
        this.closePanel();
    };
    /**
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.openPanel = /**
     * @return {?}
     */
    function () {
        this.attachOverlay();
    };
    /**
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        if (this.panelOpen) {
            this.nzAutocomplete.isOpen = this.panelOpen = false;
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.selectionChangeSubscription.unsubscribe();
                this.overlayBackdropClickSubscription.unsubscribe();
                this.overlayPositionChangeSubscription.unsubscribe();
                this.optionsChangeSubscription.unsubscribe();
                this.overlayRef.detach();
                this.overlayRef = null;
                this.portal = null;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }
        if (this.panelOpen && (keyCode === ESCAPE || keyCode === TAB)) {
            // Reset value when tab / ESC close
            if (this.activeOption && this.activeOption.getLabel() !== this.previousValue) {
                this.setTriggerValue(this.previousValue);
            }
            this.closePanel();
        }
        else if (this.panelOpen && keyCode === ENTER) {
            if (this.nzAutocomplete.showPanel && this.activeOption) {
                event.preventDefault();
                this.activeOption.selectViaInteraction();
            }
        }
        else if (this.panelOpen && isArrowKey && this.nzAutocomplete.showPanel) {
            event.stopPropagation();
            event.preventDefault();
            if (keyCode === UP_ARROW) {
                this.nzAutocomplete.setPreviousItemActive();
            }
            else {
                this.nzAutocomplete.setNextItemActive();
            }
            if (this.activeOption) {
                this.activeOption.scrollIntoViewIfNeeded();
            }
            this.doBackfill();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.handleInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        /** @type {?} */
        var value = target.value;
        if (target.type === 'number') {
            value = value === '' ? null : parseFloat(value);
        }
        if (this.canOpen() && document.activeElement === event.target && this.previousValue !== value) {
            this.previousValue = value;
            this._onChange(value);
            this.openPanel();
        }
    };
    /**
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.canOpen()) {
            this.previousValue = this.elementRef.nativeElement.value;
            this.openPanel();
        }
    };
    /**
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this.closePanel();
        this._onTouched();
    };
    /**
     * Subscription data source changes event
     */
    /**
     * Subscription data source changes event
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.subscribeOptionsChange = /**
     * Subscription data source changes event
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.nzAutocomplete.options.changes.pipe(delay(0)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.resetActiveItem();
        }));
    };
    /**
     * Subscription option changes event and set the value
     */
    /**
     * Subscription option changes event and set the value
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.subscribeSelectionChange = /**
     * Subscription option changes event and set the value
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.nzAutocomplete.selectionChange.subscribe((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            _this.setValueAndClose(option);
        }));
    };
    /**
     * Subscription external click and close panel
     */
    /**
     * Subscription external click and close panel
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.subscribeOverlayBackdropClick = /**
     * Subscription external click and close panel
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return merge(fromEvent(this.document, 'click'), fromEvent(this.document, 'touchend')).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            // Make sure is not self
            if (clickTarget !== _this.elementRef.nativeElement &&
                !(/** @type {?} */ (_this.overlayRef)).overlayElement.contains(clickTarget) &&
                _this.panelOpen) {
                _this.closePanel();
            }
        }));
    };
    /**
     * Subscription overlay position changes and reset dropdown position
     */
    /**
     * Subscription overlay position changes and reset dropdown position
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.subscribeOverlayPositionChange = /**
     * Subscription overlay position changes and reset dropdown position
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.positionStrategy.positionChanges
            .pipe(map((/**
         * @param {?} position
         * @return {?}
         */
        function (position) { return position.connectionPair.originY; })), distinct())
            .subscribe((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            _this.nzAutocomplete.dropDownPosition = position;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.attachOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.nzAutocomplete) {
            throw getNzAutocompleteMissingPanelError();
        }
        if (!this.portal) {
            this.portal = new TemplatePortal(this.nzAutocomplete.template, this.viewContainerRef);
        }
        if (!this.overlayRef) {
            this.overlayRef = this._overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayPositionChangeSubscription = this.subscribeOverlayPositionChange();
            this.selectionChangeSubscription = this.subscribeSelectionChange();
            this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
            this.optionsChangeSubscription = this.subscribeOptionsChange();
        }
        this.nzAutocomplete.isOpen = this.panelOpen = true;
        this.nzAutocomplete.setVisibility();
        this.overlayRef.updateSize({ width: this.nzAutocomplete.nzWidth || this.getHostWidth() });
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.overlayRef) {
                _this.overlayRef.updatePosition();
            }
        }), 150);
        this.resetActiveItem();
        if (this.activeOption) {
            this.activeOption.scrollIntoViewIfNeeded();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.destroyPanel = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            this.closePanel();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.getOverlayConfig = /**
     * @private
     * @return {?}
     */
    function () {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            // default host element width
            width: this.nzAutocomplete.nzWidth || this.getHostWidth()
        });
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.getConnectedElement = /**
     * @private
     * @return {?}
     */
    function () {
        return this.elementRef;
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.getHostWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.getOverlayPosition = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        this.positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withPositions(positions)
            .withFlexibleDimensions(false)
            .withPush(false);
        return this.positionStrategy;
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.resetActiveItem = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this.nzAutocomplete.getOptionIndex(this.nzAutocomplete.activeItem);
        if (this.nzAutocomplete.activeItem && index !== -1) {
            this.nzAutocomplete.setActiveItem(index);
        }
        else {
            this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
        }
    };
    /**
     * @private
     * @param {?} option
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.setValueAndClose = /**
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var value = option.nzValue;
        this.setTriggerValue(option.getLabel());
        this._onChange(value);
        this.elementRef.nativeElement.focus();
        this.closePanel();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.setTriggerValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.elementRef.nativeElement.value = value || '';
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.doBackfill = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.nzAutocomplete.nzBackfill && this.nzAutocomplete.activeItem) {
            this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzAutocompleteTriggerDirective.prototype.canOpen = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled;
    };
    NzAutocompleteTriggerDirective.decorators = [
        { type: Directive, args: [{
                    selector: "input[nzAutocomplete], textarea[nzAutocomplete]",
                    exportAs: 'nzAutocompleteTrigger',
                    providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR],
                    host: {
                        autocomplete: 'off',
                        'aria-autocomplete': 'list',
                        '(focusin)': 'handleFocus()',
                        '(blur)': 'handleBlur()',
                        '(input)': 'handleInput($event)',
                        '(keydown)': 'handleKeydown($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    NzAutocompleteTriggerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Overlay },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NzAutocompleteTriggerDirective.propDecorators = {
        nzAutocomplete: [{ type: Input }]
    };
    return NzAutocompleteTriggerDirective;
}());
export { NzAutocompleteTriggerDirective };
if (false) {
    /**
     * Bind nzAutocomplete component
     * @type {?}
     */
    NzAutocompleteTriggerDirective.prototype.nzAutocomplete;
    /** @type {?} */
    NzAutocompleteTriggerDirective.prototype._onChange;
    /** @type {?} */
    NzAutocompleteTriggerDirective.prototype._onTouched;
    /** @type {?} */
    NzAutocompleteTriggerDirective.prototype.panelOpen;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.portal;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.positionStrategy;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.previousValue;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.selectionChangeSubscription;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.optionsChangeSubscription;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.overlayBackdropClickSubscription;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.overlayPositionChangeSubscription;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    NzAutocompleteTriggerDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9hdXRvLWNvbXBsZXRlLyIsInNvdXJjZXMiOlsibnotYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRixPQUFPLEVBRUwsc0JBQXNCLEVBRXRCLE9BQU8sRUFDUCxhQUFhLEVBSWQsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFFVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFdEUsTUFBTSxLQUFPLDhCQUE4QixHQUFxQjtJQUM5RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEsOEJBQThCLEVBQTlCLENBQThCLEVBQUM7SUFDN0QsS0FBSyxFQUFFLElBQUk7Q0FDWjs7OztBQUVELE1BQU0sVUFBVSxrQ0FB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Ozs7Z0JBMUNDLFVBQVU7Z0JBWFYsT0FBTztnQkFpQlAsZ0JBQWdCO2dEQW1FYixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7OztpQ0E1QjdCLEtBQUs7O0lBaVNSLHFDQUFDO0NBQUEsQUFoVEQsSUFnVEM7U0FuU1ksOEJBQThCOzs7Ozs7SUFFekMsd0RBQWlEOztJQUdqRCxtREFBMkM7O0lBQzNDLG9EQUFzQjs7SUFDdEIsbURBQTJCOzs7OztJQVMzQixvREFBc0M7Ozs7O0lBQ3RDLGdEQUEwQzs7Ozs7SUFDMUMsMERBQTREOzs7OztJQUM1RCx1REFBOEM7Ozs7O0lBQzlDLHFFQUFrRDs7Ozs7SUFDbEQsbUVBQWdEOzs7OztJQUNoRCwwRUFBdUQ7Ozs7O0lBQ3ZELDJFQUF3RDs7Ozs7SUFHdEQsb0RBQThCOzs7OztJQUM5QixrREFBeUI7Ozs7O0lBQ3pCLDBEQUEwQzs7Ozs7SUFFMUMsa0RBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFsaWJhYmEuY29tIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBFU0NBUEUsIFRBQiwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE92ZXJsYXksXG4gIE92ZXJsYXlDb25maWcsXG4gIE92ZXJsYXlSZWYsXG4gIFBvc2l0aW9uU3RyYXRlZ3ksXG4gIFZlcnRpY2FsQ29ubmVjdGlvblBvc1xufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFeGlzdGluZ1Byb3ZpZGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBkaXN0aW5jdCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbnotYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL256LWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgTlpfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBFeGlzdGluZ1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpBdXRvY29tcGxldGVUcmlnZ2VyRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROekF1dG9jb21wbGV0ZU1pc3NpbmdQYW5lbEVycm9yKCk6IEVycm9yIHtcbiAgcmV0dXJuIEVycm9yKFxuICAgICdBdHRlbXB0aW5nIHRvIG9wZW4gYW4gdW5kZWZpbmVkIGluc3RhbmNlIG9mIGBuei1hdXRvY29tcGxldGVgLiAnICtcbiAgICAgICdNYWtlIHN1cmUgdGhhdCB0aGUgaWQgcGFzc2VkIHRvIHRoZSBgbnpBdXRvY29tcGxldGVgIGlzIGNvcnJlY3QgYW5kIHRoYXQgJyArXG4gICAgICBcInlvdSdyZSBhdHRlbXB0aW5nIHRvIG9wZW4gaXQgYWZ0ZXIgdGhlIG5nQWZ0ZXJDb250ZW50SW5pdCBob29rLlwiXG4gICk7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYGlucHV0W256QXV0b2NvbXBsZXRlXSwgdGV4dGFyZWFbbnpBdXRvY29tcGxldGVdYCxcbiAgZXhwb3J0QXM6ICduekF1dG9jb21wbGV0ZVRyaWdnZXInLFxuICBwcm92aWRlcnM6IFtOWl9BVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAnbGlzdCcsXG4gICAgJyhmb2N1c2luKSc6ICdoYW5kbGVGb2N1cygpJyxcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXQoJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpBdXRvY29tcGxldGVUcmlnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIC8qKiBCaW5kIG56QXV0b2NvbXBsZXRlIGNvbXBvbmVudCAqL1xuICBASW5wdXQoKSBuekF1dG9jb21wbGV0ZTogTnpBdXRvY29tcGxldGVDb21wb25lbnQ7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgcGFuZWxPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEN1cnJlbnQgYWN0aXZlIG9wdGlvbiAqL1xuICBnZXQgYWN0aXZlT3B0aW9uKCk6IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5uekF1dG9jb21wbGV0ZSAmJiB0aGlzLm56QXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5uekF1dG9jb21wbGV0ZS5hY3RpdmVJdGVtO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG4gIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDx7fT4gfCBudWxsO1xuICBwcml2YXRlIHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xuICBwcml2YXRlIHNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBvdmVybGF5QmFja2Ryb3BDbGlja1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIG92ZXJsYXlQb3NpdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICkge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3lQYW5lbCgpO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRyaWdnZXJWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHt9KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBlbGVtZW50LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgfVxuXG4gIGNsb3NlUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLm56QXV0b2NvbXBsZXRlLmlzT3BlbiA9IHRoaXMucGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5QmFja2Ryb3BDbGlja1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlQb3NpdGlvbkNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcnRhbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgIGNvbnN0IGlzQXJyb3dLZXkgPSBrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYW5lbE9wZW4gJiYgKGtleUNvZGUgPT09IEVTQ0FQRSB8fCBrZXlDb2RlID09PSBUQUIpKSB7XG4gICAgICAvLyBSZXNldCB2YWx1ZSB3aGVuIHRhYiAvIEVTQyBjbG9zZVxuICAgICAgaWYgKHRoaXMuYWN0aXZlT3B0aW9uICYmIHRoaXMuYWN0aXZlT3B0aW9uLmdldExhYmVsKCkgIT09IHRoaXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldFRyaWdnZXJWYWx1ZSh0aGlzLnByZXZpb3VzVmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsT3BlbiAmJiBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgaWYgKHRoaXMubnpBdXRvY29tcGxldGUuc2hvd1BhbmVsICYmIHRoaXMuYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsT3BlbiAmJiBpc0Fycm93S2V5ICYmIHRoaXMubnpBdXRvY29tcGxldGUuc2hvd1BhbmVsKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgdGhpcy5uekF1dG9jb21wbGV0ZS5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnpBdXRvY29tcGxldGUuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFjdGl2ZU9wdGlvbikge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbi5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmRvQmFja2ZpbGwoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxldCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAodGFyZ2V0LnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlID09PSAnJyA/IG51bGwgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FuT3BlbigpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCAmJiB0aGlzLnByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuT3BlbigpKSB7XG4gICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gZGF0YSBzb3VyY2UgY2hhbmdlcyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVPcHRpb25zQ2hhbmdlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubnpBdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiBvcHRpb24gY2hhbmdlcyBldmVudCBhbmQgc2V0IHRoZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVTZWxlY3Rpb25DaGFuZ2UoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5uekF1dG9jb21wbGV0ZS5zZWxlY3Rpb25DaGFuZ2Uuc3Vic2NyaWJlKChvcHRpb246IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFZhbHVlQW5kQ2xvc2Uob3B0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gZXh0ZXJuYWwgY2xpY2sgYW5kIGNsb3NlIHBhbmVsXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZU92ZXJsYXlCYWNrZHJvcENsaWNrKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIG1lcmdlPE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50PihcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLmRvY3VtZW50LCAnY2xpY2snKSxcbiAgICAgIGZyb21FdmVudDxUb3VjaEV2ZW50Pih0aGlzLmRvY3VtZW50LCAndG91Y2hlbmQnKVxuICAgICkuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAvLyBNYWtlIHN1cmUgaXMgbm90IHNlbGZcbiAgICAgIGlmIChcbiAgICAgICAgY2xpY2tUYXJnZXQgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICF0aGlzLm92ZXJsYXlSZWYhLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSAmJlxuICAgICAgICB0aGlzLnBhbmVsT3BlblxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiBvdmVybGF5IHBvc2l0aW9uIGNoYW5nZXMgYW5kIHJlc2V0IGRyb3Bkb3duIHBvc2l0aW9uXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZU92ZXJsYXlQb3NpdGlvbkNoYW5nZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKSA9PiBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5ZKSxcbiAgICAgICAgZGlzdGluY3QoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgocG9zaXRpb246IFZlcnRpY2FsQ29ubmVjdGlvblBvcykgPT4ge1xuICAgICAgICB0aGlzLm56QXV0b2NvbXBsZXRlLmRyb3BEb3duUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekF1dG9jb21wbGV0ZSkge1xuICAgICAgdGhyb3cgZ2V0TnpBdXRvY29tcGxldGVNaXNzaW5nUGFuZWxFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wb3J0YWwpIHtcbiAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubnpBdXRvY29tcGxldGUudGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICB0aGlzLm92ZXJsYXlQb3NpdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlCYWNrZHJvcENsaWNrU3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmVPdmVybGF5QmFja2Ryb3BDbGljaygpO1xuICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmVPcHRpb25zQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5uekF1dG9jb21wbGV0ZS5pc09wZW4gPSB0aGlzLnBhbmVsT3BlbiA9IHRydWU7XG4gICAgdGhpcy5uekF1dG9jb21wbGV0ZS5zZXRWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVNpemUoeyB3aWR0aDogdGhpcy5uekF1dG9jb21wbGV0ZS5ueldpZHRoIHx8IHRoaXMuZ2V0SG9zdFdpZHRoKCkgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH0sIDE1MCk7XG4gICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW0oKTtcbiAgICBpZiAodGhpcy5hY3RpdmVPcHRpb24pIHtcbiAgICAgIHRoaXMuYWN0aXZlT3B0aW9uLnNjcm9sbEludG9WaWV3SWZOZWVkZWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lQYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKSxcbiAgICAgIC8vIGRlZmF1bHQgaG9zdCBlbGVtZW50IHdpZHRoXG4gICAgICB3aWR0aDogdGhpcy5uekF1dG9jb21wbGV0ZS5ueldpZHRoIHx8IHRoaXMuZ2V0SG9zdFdpZHRoKClcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29ubmVjdGVkRWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIb3N0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb25uZWN0ZWRFbGVtZW50KCkubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH0pLFxuICAgICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICBdO1xuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmdldENvbm5lY3RlZEVsZW1lbnQoKSlcbiAgICAgIC53aXRoUG9zaXRpb25zKHBvc2l0aW9ucylcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgLndpdGhQdXNoKGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvblN0cmF0ZWd5O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm56QXV0b2NvbXBsZXRlLmdldE9wdGlvbkluZGV4KHRoaXMubnpBdXRvY29tcGxldGUuYWN0aXZlSXRlbSk7XG4gICAgaWYgKHRoaXMubnpBdXRvY29tcGxldGUuYWN0aXZlSXRlbSAmJiBpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubnpBdXRvY29tcGxldGUuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubnpBdXRvY29tcGxldGUuc2V0QWN0aXZlSXRlbSh0aGlzLm56QXV0b2NvbXBsZXRlLm56RGVmYXVsdEFjdGl2ZUZpcnN0T3B0aW9uID8gMCA6IC0xKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZhbHVlQW5kQ2xvc2Uob3B0aW9uOiBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uLm56VmFsdWU7XG4gICAgdGhpcy5zZXRUcmlnZ2VyVmFsdWUob3B0aW9uLmdldExhYmVsKCkpO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUcmlnZ2VyVmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlIHx8ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0JhY2tmaWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QXV0b2NvbXBsZXRlLm56QmFja2ZpbGwgJiYgdGhpcy5uekF1dG9jb21wbGV0ZS5hY3RpdmVJdGVtKSB7XG4gICAgICB0aGlzLnNldFRyaWdnZXJWYWx1ZSh0aGlzLm56QXV0b2NvbXBsZXRlLmFjdGl2ZUl0ZW0uZ2V0TGFiZWwoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5PcGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gIWVsZW1lbnQucmVhZE9ubHkgJiYgIWVsZW1lbnQuZGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==
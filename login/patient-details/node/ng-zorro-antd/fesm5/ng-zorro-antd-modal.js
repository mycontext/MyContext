import { __extends, __assign, __decorate, __metadata } from 'tslib';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { takeUntil } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { InjectionToken, Injectable, Optional, SkipSelf, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, TemplateRef, Type, ViewChild, ViewContainerRef, Pipe, NgModule } from '@angular/core';
import { getElementOffset, isPromise, InputBoolean, LoggerService, LoggerModule, NzNoAnimationModule } from 'ng-zorro-antd/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NZ_MODAL_CONFIG = new InjectionToken('NZ_MODAL_CONFIG');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzModalControlService = /** @class */ (function () {
    function NzModalControlService(parentService) {
        this.parentService = parentService;
        this.rootOpenModals = this.parentService ? null : [];
        this.rootAfterAllClose = this.parentService ? null : new Subject();
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    Object.defineProperty(NzModalControlService.prototype, "afterAllClose", {
        // Track singleton afterAllClose through over the injection tree
        get: 
        // Track singleton afterAllClose through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.afterAllClose : (/** @type {?} */ (this.rootAfterAllClose));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalControlService.prototype, "openModals", {
        // Track singleton openModals array through over the injection tree
        get: 
        // Track singleton openModals array through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.openModals : (/** @type {?} */ (this.rootOpenModals));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalControlService.prototype, "registeredMetaMap", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            // Registered modal for later usage
            return this.parentService ? this.parentService.registeredMetaMap : (/** @type {?} */ (this.rootRegisteredMetaMap));
        },
        enumerable: true,
        configurable: true
    });
    // Register a modal to listen its open/close
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    NzModalControlService.prototype.registerModal = 
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        var _this = this;
        if (!this.hasRegistered(modalRef)) {
            /** @type {?} */
            var afterOpenSubscription = modalRef.afterOpen.subscribe((/**
             * @return {?}
             */
            function () { return _this.openModals.push(modalRef); }));
            /** @type {?} */
            var afterCloseSubscription = modalRef.afterClose.subscribe((/**
             * @return {?}
             */
            function () { return _this.removeOpenModal(modalRef); }));
            this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
        }
    };
    // deregister modals
    // deregister modals
    /**
     * @param {?} modalRef
     * @return {?}
     */
    NzModalControlService.prototype.deregisterModal = 
    // deregister modals
    /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        /** @type {?} */
        var registeredMeta = this.registeredMetaMap.get(modalRef);
        if (registeredMeta) {
            // Remove this modal if it is still in the opened modal list (NOTE: it may trigger "afterAllClose")
            this.removeOpenModal(registeredMeta.modalRef);
            registeredMeta.afterOpenSubscription.unsubscribe();
            registeredMeta.afterCloseSubscription.unsubscribe();
            this.registeredMetaMap.delete(modalRef);
        }
    };
    /**
     * @param {?} modalRef
     * @return {?}
     */
    NzModalControlService.prototype.hasRegistered = /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        return this.registeredMetaMap.has(modalRef);
    };
    // Close all registered opened modals
    // Close all registered opened modals
    /**
     * @return {?}
     */
    NzModalControlService.prototype.closeAll = 
    // Close all registered opened modals
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    };
    /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    NzModalControlService.prototype.removeOpenModal = /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        /** @type {?} */
        var index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    };
    NzModalControlService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NzModalControlService.ctorParameters = function () { return [
        { type: NzModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return NzModalControlService;
}());

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
/**
 * API class that public to users to handle the modal instance.
 * NzModalRef is aim to avoid accessing to the modal instance directly by users.
 * @abstract
 * @template T, R
 */
// tslint:disable-next-line:no-any
var  /**
 * API class that public to users to handle the modal instance.
 * NzModalRef is aim to avoid accessing to the modal instance directly by users.
 * @abstract
 * @template T, R
 */
// tslint:disable-next-line:no-any
NzModalRef = /** @class */ (function () {
    function NzModalRef() {
    }
    return NzModalRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MODAL_ANIMATE_DURATION = 200;
/**
 * @template T, R
 */
var NzModalComponent = /** @class */ (function (_super) {
    __extends(NzModalComponent, _super);
    function NzModalComponent(overlay, i18n, cfr, elementRef, viewContainer, modalControl, focusTrapFactory, cdr, nzModalGlobalConfig, document // tslint:disable-line:no-any
    ) {
        var _this = _super.call(this) || this;
        _this.overlay = overlay;
        _this.i18n = i18n;
        _this.cfr = cfr;
        _this.elementRef = elementRef;
        _this.viewContainer = viewContainer;
        _this.modalControl = modalControl;
        _this.focusTrapFactory = focusTrapFactory;
        _this.cdr = cdr;
        _this.nzModalGlobalConfig = nzModalGlobalConfig;
        _this.document = document;
        _this.nzVisible = false;
        _this.nzClosable = true;
        _this.nzOkLoading = false;
        _this.nzOkDisabled = false;
        _this.nzCancelDisabled = false;
        _this.nzCancelLoading = false;
        _this.nzKeyboard = true;
        _this.nzNoAnimation = false;
        // [STATIC] Default Modal ONLY
        _this.nzGetContainer = (/**
         * @return {?}
         */
        function () { return _this.overlay.create(); }); // [STATIC]
        // [STATIC]
        _this.nzZIndex = 1000;
        _this.nzWidth = 520;
        _this.nzOkType = 'primary';
        _this.nzIconType = 'question-circle'; // Confirm Modal ONLY
        // Confirm Modal ONLY
        _this.nzModalType = 'default';
        _this.nzOnOk = new EventEmitter();
        _this.nzOnCancel = new EventEmitter();
        _this.nzAfterOpen = new EventEmitter(); // Trigger when modal open(visible) after animations
        // Trigger when modal open(visible) after animations
        _this.nzAfterClose = new EventEmitter(); // Trigger when modal leave-animation over
        // Trigger when modal leave-animation over
        _this.nzVisibleChange = new EventEmitter();
        _this.locale = {};
        _this.transformOrigin = '0px 0px 0px'; // The origin point that animation based on
        _this.unsubscribe$ = new Subject();
        _this.scrollStrategy = _this.overlay.scrollStrategies.block();
        return _this;
    }
    Object.defineProperty(NzModalComponent.prototype, "afterOpen", {
        get: 
        // Only aim to focus the ok button that needs to be auto focused
        /**
         * @return {?}
         */
        function () {
            // Observable alias for nzAfterOpen
            return this.nzAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "afterClose", {
        get: /**
         * @return {?}
         */
        function () {
            // Observable alias for nzAfterClose
            return this.nzAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "cancelText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzCancelText || (/** @type {?} */ (this.locale.cancelText));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "okText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzOkText || (/** @type {?} */ (this.locale.okText));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "hidden", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.nzVisible && !this.animationState;
        } // Indicate whether this dialog should hidden
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "mask", {
        /**
         * @description
         * The calculated highest weight of mask value
         *
         * Weight of different mask input:
         * component default value < global configuration < component input value
         */
        get: 
        // Indicate whether this dialog should hidden
        /**
         * \@description
         * The calculated highest weight of mask value
         *
         * Weight of different mask input:
         * component default value < global configuration < component input value
         * @return {?}
         */
        function () {
            if (this.nzMask != null) {
                return this.nzMask;
            }
            else if (this.nzModalGlobalConfig && this.nzModalGlobalConfig.nzMask != null) {
                return this.nzModalGlobalConfig.nzMask;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "maskClosable", {
        /**
         * @description
         * The calculated highest weight of maskClosable value
         *
         * Weight of different maskClosable input:
         * component default value < global configuration < component input value
         */
        get: /**
         * \@description
         * The calculated highest weight of maskClosable value
         *
         * Weight of different maskClosable input:
         * component default value < global configuration < component input value
         * @return {?}
         */
        function () {
            if (this.nzMaskClosable != null) {
                return this.nzMaskClosable;
            }
            else if (this.nzModalGlobalConfig && this.nzModalGlobalConfig.nzMaskClosable != null) {
                return this.nzModalGlobalConfig.nzMaskClosable;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = (/** @type {?} */ (_this.i18n.getLocaleData('Modal')));
        }));
        fromEvent(this.document.body, 'keydown')
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.keydownListener(e); }));
        if (this.isComponent(this.nzContent)) {
            this.createDynamicComponent((/** @type {?} */ (this.nzContent))); // Create component along without View
        }
        if (this.isModalButtons(this.nzFooter)) {
            // Setup default button options
            this.nzFooter = this.formatModalButtons((/** @type {?} */ (this.nzFooter)));
        }
        // Place the modal dom to elsewhere
        this.container = typeof this.nzGetContainer === 'function' ? this.nzGetContainer() : this.nzGetContainer;
        if (this.container instanceof HTMLElement) {
            this.container.appendChild(this.elementRef.nativeElement);
        }
        else if (this.container instanceof OverlayRef) {
            // NOTE: only attach the dom to overlay, the view container is not changed actually
            this.container.overlayElement.appendChild(this.elementRef.nativeElement);
        }
        // Register modal when afterOpen/afterClose is stable
        this.modalControl.registerModal(this);
    };
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "nzContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "nzContent" dynamically to trigger UI changes (provided you don't use Component that needs initializations)
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "nzContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "nzContent" dynamically to trigger UI changes (provided you don't use Component that needs initializations)
    /**
     * @param {?} changes
     * @return {?}
     */
    NzModalComponent.prototype.ngOnChanges = 
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "nzContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "nzContent" dynamically to trigger UI changes (provided you don't use Component that needs initializations)
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nzVisible) {
            this.handleVisibleStateChange(this.nzVisible, !changes.nzVisible.firstChange); // Do not trigger animation while initializing
        }
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        if (this.autoFocusButtonOk) {
            ((/** @type {?} */ (this.autoFocusButtonOk.nativeElement))).focus();
        }
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Close self before destructing
        this.changeVisibleFromInside(false).then((/**
         * @return {?}
         */
        function () {
            _this.modalControl.deregisterModal(_this);
            if (_this.container instanceof OverlayRef) {
                _this.container.dispose();
            }
            _this.unsubscribe$.next();
            _this.unsubscribe$.complete();
        }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzModalComponent.prototype.keydownListener = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === ESCAPE && this.nzKeyboard) {
            this.onClickOkCancel('cancel');
        }
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.changeVisibleFromInside(true);
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    NzModalComponent.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        this.changeVisibleFromInside(false, result);
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    NzModalComponent.prototype.destroy = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        // Destroy equals Close
        this.close(result);
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.triggerOk = /**
     * @return {?}
     */
    function () {
        this.onClickOkCancel('ok');
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.triggerCancel = /**
     * @return {?}
     */
    function () {
        this.onClickOkCancel('cancel');
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return this;
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.getContentComponentRef = /**
     * @return {?}
     */
    function () {
        return this.contentComponentRef;
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.getContentComponent = /**
     * @return {?}
     */
    function () {
        return this.contentComponentRef && this.contentComponentRef.instance;
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.getElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef && this.elementRef.nativeElement;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NzModalComponent.prototype.onClickMask = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.mask &&
            this.maskClosable &&
            ((/** @type {?} */ ($event.target))).classList.contains('ant-modal-wrap') &&
            this.nzVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NzModalComponent.prototype.isModalType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.nzModalType === type;
    };
    /**
     * @return {?}
     */
    NzModalComponent.prototype.onClickCloseBtn = /**
     * @return {?}
     */
    function () {
        if (this.nzVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    NzModalComponent.prototype.onClickOkCancel = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        /** @type {?} */
        var trigger = { ok: this.nzOnOk, cancel: this.nzOnCancel }[type];
        /** @type {?} */
        var loadingKey = { ok: 'nzOkLoading', cancel: 'nzCancelLoading' }[type];
        if (trigger instanceof EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            /** @type {?} */
            var result = trigger(this.getContentComponent());
            /** @type {?} */
            var caseClose_1 = (/**
             * @param {?} doClose
             * @return {?}
             */
            function (doClose) { return doClose !== false && _this.close((/** @type {?} */ (doClose))); });
            if (isPromise(result)) {
                this[loadingKey] = true;
                /** @type {?} */
                var handleThen = (/**
                 * @param {?} doClose
                 * @return {?}
                 */
                function (doClose) {
                    _this[loadingKey] = false;
                    caseClose_1(doClose);
                });
                ((/** @type {?} */ (result))).then(handleThen).catch(handleThen);
            }
            else {
                caseClose_1(result);
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzModalComponent.prototype.isNonEmptyString = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' && value !== '';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzModalComponent.prototype.isTemplateRef = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof TemplateRef;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzModalComponent.prototype.isComponent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof Type;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzModalComponent.prototype.isModalButtons = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Array.isArray(value) && value.length > 0;
    };
    // Do rest things when visible state changed
    // Do rest things when visible state changed
    /**
     * @private
     * @param {?} visible
     * @param {?=} animation
     * @param {?=} closeResult
     * @return {?}
     */
    NzModalComponent.prototype.handleVisibleStateChange = 
    // Do rest things when visible state changed
    /**
     * @private
     * @param {?} visible
     * @param {?=} animation
     * @param {?=} closeResult
     * @return {?}
     */
    function (visible, animation, closeResult) {
        var _this = this;
        if (animation === void 0) { animation = true; }
        if (visible) {
            // Hide scrollbar at the first time when shown up
            this.scrollStrategy.enable();
            this.savePreviouslyFocusedElement();
            this.trapFocus();
        }
        return Promise.resolve(animation ? this.animateTo(visible) : undefined).then((/**
         * @return {?}
         */
        function () {
            // Emit open/close event after animations over
            if (visible) {
                _this.nzAfterOpen.emit();
            }
            else {
                _this.nzAfterClose.emit(closeResult);
                _this.restoreFocus();
                _this.scrollStrategy.disable();
                // Mark the for check so it can react if the view container is using OnPush change detection.
                _this.cdr.markForCheck();
            }
        }));
    };
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    NzModalComponent.prototype.getButtonCallableProp = 
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    function (options, prop) {
        /** @type {?} */
        var value = options[prop];
        /** @type {?} */
        var args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    };
    // On nzFooter's modal button click
    // On nzFooter's modal button click
    /**
     * @param {?} button
     * @return {?}
     */
    NzModalComponent.prototype.onButtonClick = 
    // On nzFooter's modal button click
    /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        /** @type {?} */
        var result = this.getButtonCallableProp(button, 'onClick');
        if (isPromise(result)) {
            button.loading = true;
            ((/** @type {?} */ (result))).then((/**
             * @return {?}
             */
            function () { return (button.loading = false); })).catch((/**
             * @return {?}
             */
            function () { return (button.loading = false); }));
        }
    };
    // Change nzVisible from inside
    // Change nzVisible from inside
    /**
     * @private
     * @param {?} visible
     * @param {?=} closeResult
     * @return {?}
     */
    NzModalComponent.prototype.changeVisibleFromInside = 
    // Change nzVisible from inside
    /**
     * @private
     * @param {?} visible
     * @param {?=} closeResult
     * @return {?}
     */
    function (visible, closeResult) {
        if (this.nzVisible !== visible) {
            // Change nzVisible value immediately
            this.nzVisible = visible;
            this.nzVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    NzModalComponent.prototype.changeAnimationState = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var _a, _b;
        this.animationState = state;
        if (state) {
            this.maskAnimationClassMap = (_a = {},
                _a["fade-" + state] = true,
                _a["fade-" + state + "-active"] = true,
                _a);
            this.modalAnimationClassMap = (_b = {},
                _b["zoom-" + state] = true,
                _b["zoom-" + state + "-active"] = true,
                _b);
        }
        else {
            this.maskAnimationClassMap = this.modalAnimationClassMap = null;
        }
    };
    /**
     * @private
     * @param {?} isVisible
     * @return {?}
     */
    NzModalComponent.prototype.animateTo = /**
     * @private
     * @param {?} isVisible
     * @return {?}
     */
    function (isVisible) {
        var _this = this;
        if (isVisible) {
            // Figure out the lastest click position when shows up
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.updateTransformOrigin(); })); // [NOTE] Using timeout due to the document.click event is fired later than visible change, so if not postponed to next event-loop, we can't get the lastest click position
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            return setTimeout((/**
             * @return {?}
             */
            function () {
                // Return when animation is over
                _this.changeAnimationState(null);
                resolve();
            }), _this.nzNoAnimation ? 0 : MODAL_ANIMATE_DURATION);
        }));
    };
    /**
     * @private
     * @param {?} buttons
     * @return {?}
     */
    NzModalComponent.prototype.formatModalButtons = /**
     * @private
     * @param {?} buttons
     * @return {?}
     */
    function (buttons) {
        return buttons.map((/**
         * @param {?} button
         * @return {?}
         */
        function (button) {
            return __assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button);
        }));
    };
    /**
     * Create a component dynamically but not attach to any View (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    /**
     * Create a component dynamically but not attach to any View (this action will be executed when bodyContainer is ready)
     * @private
     * @param {?} component Component class
     * @return {?}
     */
    NzModalComponent.prototype.createDynamicComponent = /**
     * Create a component dynamically but not attach to any View (this action will be executed when bodyContainer is ready)
     * @private
     * @param {?} component Component class
     * @return {?}
     */
    function (component) {
        /** @type {?} */
        var factory = this.cfr.resolveComponentFactory(component);
        /** @type {?} */
        var childInjector = Injector.create({
            providers: [{ provide: NzModalRef, useValue: this }],
            parent: this.viewContainer.parentInjector
        });
        this.contentComponentRef = factory.create(childInjector);
        if (this.nzComponentParams) {
            Object.assign(this.contentComponentRef.instance, this.nzComponentParams);
        }
        // Do the first change detection immediately (or we do detection at ngAfterViewInit, multi-changes error will be thrown)
        this.contentComponentRef.changeDetectorRef.detectChanges();
    };
    // Update transform-origin to the last click position on document
    // Update transform-origin to the last click position on document
    /**
     * @private
     * @return {?}
     */
    NzModalComponent.prototype.updateTransformOrigin = 
    // Update transform-origin to the last click position on document
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var modalElement = (/** @type {?} */ (this.modalContainer.nativeElement));
        if (this.previouslyFocusedElement) {
            /** @type {?} */
            var previouslyDOMRect = this.previouslyFocusedElement.getBoundingClientRect();
            /** @type {?} */
            var lastPosition = getElementOffset(this.previouslyFocusedElement);
            /** @type {?} */
            var x = lastPosition.left + previouslyDOMRect.width / 2;
            /** @type {?} */
            var y = lastPosition.top + previouslyDOMRect.height / 2;
            this.transformOrigin = x - modalElement.offsetLeft + "px " + (y - modalElement.offsetTop) + "px 0px";
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzModalComponent.prototype.savePreviouslyFocusedElement = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.document) {
            this.previouslyFocusedElement = (/** @type {?} */ (this.document.activeElement));
        }
    };
    /**
     * @private
     * @return {?}
     */
    NzModalComponent.prototype.trapFocus = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }
        this.focusTrap.focusInitialElementWhenReady();
    };
    /**
     * @private
     * @return {?}
     */
    NzModalComponent.prototype.restoreFocus = /**
     * @private
     * @return {?}
     */
    function () {
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    };
    NzModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-modal',
                    exportAs: 'nzModal',
                    template: "<ng-template #tplOriginContent><ng-content></ng-content></ng-template> <!-- Compatible: the <ng-content> can appear only once -->\n\n<div [nzNoAnimation]=\"nzNoAnimation\">\n  <div *ngIf=\"mask\"\n    class=\"ant-modal-mask\"\n    [ngClass]=\"maskAnimationClassMap\"\n    [class.ant-modal-mask-hidden]=\"hidden\"\n    [ngStyle]=\"nzMaskStyle\"\n    [style.zIndex]=\"nzZIndex\"\n  ></div>\n  <div\n    (click)=\"onClickMask($event)\"\n    class=\"ant-modal-wrap {{ nzWrapClassName }}\"\n    [style.zIndex]=\"nzZIndex\"\n    [style.visibility]=\"hidden ? 'hidden' : null\"\n    tabindex=\"-1\"\n    role=\"dialog\"\n  >\n    <div #modalContainer\n      class=\"ant-modal {{ nzClassName }}\"\n      [ngClass]=\"modalAnimationClassMap\"\n      [ngStyle]=\"nzStyle\"\n      [style.width]=\"nzWidth | toCssUnit\"\n      [style.transform-origin]=\"transformOrigin\"\n      role=\"document\"\n    >\n      <div class=\"ant-modal-content\">\n        <button *ngIf=\"nzClosable\" (click)=\"onClickCloseBtn()\" class=\"ant-modal-close\" aria-label=\"Close\">\n          <span class=\"ant-modal-close-x\">\n            <i nz-icon type=\"close\" class=\"ant-modal-close-icon\"></i>\n          </span>\n        </button>\n        <ng-container *ngIf=\"!hidden\" [ngSwitch]=\"true\">\n          <ng-container *ngSwitchCase=\"isModalType('default')\" [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n          <ng-container *ngSwitchCase=\"isModalType('confirm')\" [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n  <div *ngIf=\"nzTitle\" class=\"ant-modal-header\">\n    <div class=\"ant-modal-title\">\n      <ng-container [ngSwitch]=\"true\">\n        <ng-container *ngSwitchCase=\"isTemplateRef(nzTitle)\" [ngTemplateOutlet]=\"nzTitle\"></ng-container>\n        <ng-container *ngSwitchCase=\"isNonEmptyString(nzTitle)\"><div [innerHTML]=\"nzTitle\"></div></ng-container>\n      </ng-container>\n    </div>\n  </div>\n  <div class=\"ant-modal-body\" [ngStyle]=\"nzBodyStyle\">\n    <ng-container #bodyContainer>\n      <ng-container *ngIf=\"!isComponent(nzContent)\" [ngSwitch]=\"true\">\n        <ng-container *ngSwitchCase=\"isTemplateRef(nzContent)\" [ngTemplateOutlet]=\"nzContent\"></ng-container>\n        <ng-container *ngSwitchCase=\"isNonEmptyString(nzContent)\"><div [innerHTML]=\"nzContent\"></div></ng-container>\n        <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n  <div *ngIf=\"nzFooter !== null\" class=\"ant-modal-footer\">\n    <ng-container [ngSwitch]=\"true\">\n      <ng-container *ngSwitchCase=\"isTemplateRef(nzFooter)\" [ngTemplateOutlet]=\"nzFooter\"></ng-container>\n      <ng-container *ngSwitchCase=\"isNonEmptyString(nzFooter)\"><div [innerHTML]=\"nzFooter\"></div></ng-container>\n      <ng-container *ngSwitchCase=\"isModalButtons(nzFooter)\">\n        <button *ngFor=\"let button of nzFooter\" nz-button\n          (click)=\"onButtonClick(button)\"\n          [hidden]=\"!getButtonCallableProp(button, 'show')\"\n          [nzLoading]=\"getButtonCallableProp(button, 'loading')\"\n          [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n          [nzType]=\"button.type\"\n          [nzShape]=\"button.shape\"\n          [nzSize]=\"button.size\"\n          [nzGhost]=\"button.ghost\"\n        >{{ button.label }}</button>\n      </ng-container>\n      <ng-container *ngSwitchDefault>\n        <button *ngIf=\"nzCancelText!==null\" nz-button (click)=\"onClickOkCancel('cancel')\" [nzLoading]=\"nzCancelLoading\" [disabled]=\"nzCancelDisabled\">\n          {{ cancelText }}\n        </button>\n        <button *ngIf=\"nzOkText!==null\" nz-button [nzType]=\"nzOkType\" (click)=\"onClickOkCancel('ok')\" [nzLoading]=\"nzOkLoading\" [disabled]=\"nzOkDisabled\">\n          {{ okText }}\n        </button>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n  <div class=\"ant-modal-body\" [ngStyle]=\"nzBodyStyle\">\n    <div class=\"ant-modal-confirm-body-wrapper\">\n      <div class=\"ant-modal-confirm-body\">\n        <i nz-icon [type]=\"nzIconType\"></i>\n        <span class=\"ant-modal-confirm-title\">\n          <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(nzTitle)\" [ngTemplateOutlet]=\"nzTitle\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(nzTitle)\"><span [innerHTML]=\"nzTitle\"></span></ng-container>\n          </ng-container>\n        </span>\n        <div class=\"ant-modal-confirm-content\">\n          <ng-container>\n            <ng-container *ngIf=\"!isComponent(nzContent)\" [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(nzContent)\" [ngTemplateOutlet]=\"nzContent\"></ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(nzContent)\"><div [innerHTML]=\"nzContent\"></div></ng-container>\n              <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n      <div class=\"ant-modal-confirm-btns\">\n        <button nz-button *ngIf=\"nzCancelText!==null\" (click)=\"onClickOkCancel('cancel')\" [nzLoading]=\"nzCancelLoading\">\n          {{ cancelText }}\n        </button>\n        <button *ngIf=\"nzOkText!==null\" #autoFocusButtonOk nz-button [nzType]=\"nzOkType\" (click)=\"onClickOkCancel('ok')\" [nzLoading]=\"nzOkLoading\">\n          {{ okText }}\n        </button>\n      </div>\n    </div> <!-- /.ant-modal-confirm-body-wrapper -->\n  </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n",
                    // Using OnPush for modal caused footer can not to detect changes. we can fix it when 8.x.
                    changeDetection: ChangeDetectionStrategy.Default
                }] }
    ];
    /** @nocollapse */
    NzModalComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: NzI18nService },
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: NzModalControlService },
        { type: FocusTrapFactory },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_MODAL_CONFIG,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NzModalComponent.propDecorators = {
        nzVisible: [{ type: Input }],
        nzClosable: [{ type: Input }],
        nzOkLoading: [{ type: Input }],
        nzOkDisabled: [{ type: Input }],
        nzCancelDisabled: [{ type: Input }],
        nzCancelLoading: [{ type: Input }],
        nzKeyboard: [{ type: Input }],
        nzNoAnimation: [{ type: Input }],
        nzMask: [{ type: Input }],
        nzMaskClosable: [{ type: Input }],
        nzContent: [{ type: Input }],
        nzComponentParams: [{ type: Input }],
        nzFooter: [{ type: Input }],
        nzGetContainer: [{ type: Input }],
        nzZIndex: [{ type: Input }],
        nzWidth: [{ type: Input }],
        nzWrapClassName: [{ type: Input }],
        nzClassName: [{ type: Input }],
        nzStyle: [{ type: Input }],
        nzTitle: [{ type: Input }],
        nzMaskStyle: [{ type: Input }],
        nzBodyStyle: [{ type: Input }],
        nzOkText: [{ type: Input }],
        nzCancelText: [{ type: Input }],
        nzOkType: [{ type: Input }],
        nzIconType: [{ type: Input }],
        nzModalType: [{ type: Input }],
        nzOnOk: [{ type: Input }, { type: Output }],
        nzOnCancel: [{ type: Input }, { type: Output }],
        nzAfterOpen: [{ type: Output }],
        nzAfterClose: [{ type: Output }],
        nzVisibleChange: [{ type: Output }],
        modalContainer: [{ type: ViewChild, args: ['modalContainer',] }],
        bodyContainer: [{ type: ViewChild, args: ['bodyContainer', { read: ViewContainerRef },] }],
        autoFocusButtonOk: [{ type: ViewChild, args: ['autoFocusButtonOk', { read: ElementRef },] }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzVisible", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzClosable", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzOkLoading", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzOkDisabled", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzCancelDisabled", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzCancelLoading", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzKeyboard", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzModalComponent.prototype, "nzNoAnimation", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzMask", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzModalComponent.prototype, "nzMaskClosable", void 0);
    return NzModalComponent;
}(NzModalRef));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CssUnitPipe = /** @class */ (function () {
    function CssUnitPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    CssUnitPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        /** @type {?} */
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    CssUnitPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'toCssUnit'
                },] }
    ];
    return CssUnitPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// A builder used for managing service creating modals
var 
// A builder used for managing service creating modals
ModalBuilderForService = /** @class */ (function () {
    function ModalBuilderForService(overlay, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.overlay = overlay;
        this.createModal();
        if (!('nzGetContainer' in options)) {
            // As we use CDK to create modal in service by force, there is no need to use nzGetContainer
            options.nzGetContainer = undefined; // Override nzGetContainer's default value to prevent creating another overlay
        }
        this.changeProps(options);
        (/** @type {?} */ (this.modalRef)).instance.open();
        (/** @type {?} */ (this.modalRef)).instance.nzAfterClose.subscribe((/**
         * @return {?}
         */
        function () { return _this.destroyModal(); })); // [NOTE] By default, close equals destroy when using as Service
    }
    /**
     * @return {?}
     */
    ModalBuilderForService.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return this.modalRef && this.modalRef.instance;
    };
    /**
     * @return {?}
     */
    ModalBuilderForService.prototype.destroyModal = /**
     * @return {?}
     */
    function () {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    ModalBuilderForService.prototype.changeProps = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (this.modalRef) {
            Object.assign(this.modalRef.instance, options); // DANGER: here not limit user's inputs at runtime
        }
    };
    // Create component to ApplicationRef
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    ModalBuilderForService.prototype.createModal = 
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    function () {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(NzModalComponent));
    };
    return ModalBuilderForService;
}());
var NzModalService = /** @class */ (function () {
    function NzModalService(overlay, logger, modalControl) {
        this.overlay = overlay;
        this.logger = logger;
        this.modalControl = modalControl;
    }
    Object.defineProperty(NzModalService.prototype, "openModals", {
        // Track of the current close modals (we assume invisible is close this time)
        get: 
        // Track of the current close modals (we assume invisible is close this time)
        /**
         * @return {?}
         */
        function () {
            return this.modalControl.openModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalService.prototype, "afterAllClose", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modalControl.afterAllClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Closes all of the currently-open dialogs
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    NzModalService.prototype.closeAll = 
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    function () {
        this.modalControl.closeAll();
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    NzModalService.prototype.create = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.nzOnCancel !== 'function') {
            options.nzOnCancel = (/**
             * @return {?}
             */
            function () { }); // Leave a empty function to close this modal by default
        }
        // NOTE: use NzModalComponent as the NzModalRef by now, we may need archive the real NzModalRef object in the future
        /** @type {?} */
        var modalRef = (/** @type {?} */ (new ModalBuilderForService(this.overlay, options).getInstance()));
        return modalRef;
    };
    /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    NzModalService.prototype.confirm = /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    function (options, confirmType) {
        if (options === void 0) { options = {}; }
        if (confirmType === void 0) { confirmType = 'confirm'; }
        if ('nzFooter' in options) {
            this.logger.warn("The Confirm-Modal doesn't support \"nzFooter\", this property will be ignored.");
        }
        if (!('nzWidth' in options)) {
            options.nzWidth = 416;
        }
        if (typeof options.nzOnOk !== 'function') {
            // NOTE: only support function currently by calling confirm()
            options.nzOnOk = (/**
             * @return {?}
             */
            function () { }); // Leave a empty function to close this modal by default
        }
        options.nzModalType = 'confirm';
        options.nzClassName = "ant-modal-confirm ant-modal-confirm-" + confirmType + " " + (options.nzClassName || '');
        options.nzMaskClosable = false;
        return this.create(options);
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    NzModalService.prototype.info = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'info');
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    NzModalService.prototype.success = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'success');
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    NzModalService.prototype.error = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'error');
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    NzModalService.prototype.warning = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'warning');
    };
    /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    NzModalService.prototype.simpleConfirm = /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    function (options, confirmType) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var iconMap = {
            info: 'info-circle',
            success: 'check-circle',
            error: 'close-circle',
            warning: 'exclamation-circle'
        };
        if (!('nzIconType' in options)) {
            options.nzIconType = iconMap[confirmType];
        }
        if (!('nzCancelText' in options)) {
            // Remove the Cancel button if the user not specify a Cancel button
            options.nzCancelText = null;
        }
        return this.confirm(options, confirmType);
    };
    NzModalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NzModalService.ctorParameters = function () { return [
        { type: Overlay },
        { type: LoggerService },
        { type: NzModalControlService }
    ]; };
    return NzModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzModalModule = /** @class */ (function () {
    function NzModalModule() {
    }
    NzModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule, NzI18nModule, NzButtonModule, LoggerModule, NzIconModule, NzNoAnimationModule],
                    exports: [NzModalComponent],
                    declarations: [NzModalComponent, CssUnitPipe],
                    entryComponents: [NzModalComponent],
                    providers: [NzModalControlService, NzModalService]
                },] }
    ];
    return NzModalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzModalComponent, NzModalRef, NzModalModule, NzModalService, NZ_MODAL_CONFIG, NzModalControlService, CssUnitPipe };

//# sourceMappingURL=ng-zorro-antd-modal.js.map
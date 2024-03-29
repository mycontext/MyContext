(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ng-zorro-antd/affix'), require('ng-zorro-antd/alert'), require('ng-zorro-antd/anchor'), require('ng-zorro-antd/auto-complete'), require('ng-zorro-antd/avatar'), require('ng-zorro-antd/back-top'), require('ng-zorro-antd/badge'), require('ng-zorro-antd/breadcrumb'), require('ng-zorro-antd/button'), require('ng-zorro-antd/calendar'), require('ng-zorro-antd/card'), require('ng-zorro-antd/carousel'), require('ng-zorro-antd/cascader'), require('ng-zorro-antd/checkbox'), require('ng-zorro-antd/collapse'), require('ng-zorro-antd/comment'), require('ng-zorro-antd/core'), require('ng-zorro-antd/date-picker'), require('ng-zorro-antd/divider'), require('ng-zorro-antd/drawer'), require('ng-zorro-antd/dropdown'), require('ng-zorro-antd/empty'), require('ng-zorro-antd/form'), require('ng-zorro-antd/grid'), require('ng-zorro-antd/i18n'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/input'), require('ng-zorro-antd/input-number'), require('ng-zorro-antd/layout'), require('ng-zorro-antd/list'), require('ng-zorro-antd/mention'), require('ng-zorro-antd/menu'), require('ng-zorro-antd/message'), require('ng-zorro-antd/modal'), require('ng-zorro-antd/notification'), require('ng-zorro-antd/page-header'), require('ng-zorro-antd/pagination'), require('ng-zorro-antd/popconfirm'), require('ng-zorro-antd/popover'), require('ng-zorro-antd/progress'), require('ng-zorro-antd/radio'), require('ng-zorro-antd/rate'), require('ng-zorro-antd/select'), require('ng-zorro-antd/skeleton'), require('ng-zorro-antd/slider'), require('ng-zorro-antd/spin'), require('ng-zorro-antd/statistic'), require('ng-zorro-antd/steps'), require('ng-zorro-antd/switch'), require('ng-zorro-antd/table'), require('ng-zorro-antd/tabs'), require('ng-zorro-antd/tag'), require('ng-zorro-antd/time-picker'), require('ng-zorro-antd/timeline'), require('ng-zorro-antd/tooltip'), require('ng-zorro-antd/transfer'), require('ng-zorro-antd/tree'), require('ng-zorro-antd/tree-select'), require('ng-zorro-antd/upload'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd', ['exports', 'ng-zorro-antd/affix', 'ng-zorro-antd/alert', 'ng-zorro-antd/anchor', 'ng-zorro-antd/auto-complete', 'ng-zorro-antd/avatar', 'ng-zorro-antd/back-top', 'ng-zorro-antd/badge', 'ng-zorro-antd/breadcrumb', 'ng-zorro-antd/button', 'ng-zorro-antd/calendar', 'ng-zorro-antd/card', 'ng-zorro-antd/carousel', 'ng-zorro-antd/cascader', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/collapse', 'ng-zorro-antd/comment', 'ng-zorro-antd/core', 'ng-zorro-antd/date-picker', 'ng-zorro-antd/divider', 'ng-zorro-antd/drawer', 'ng-zorro-antd/dropdown', 'ng-zorro-antd/empty', 'ng-zorro-antd/form', 'ng-zorro-antd/grid', 'ng-zorro-antd/i18n', 'ng-zorro-antd/icon', 'ng-zorro-antd/input', 'ng-zorro-antd/input-number', 'ng-zorro-antd/layout', 'ng-zorro-antd/list', 'ng-zorro-antd/mention', 'ng-zorro-antd/menu', 'ng-zorro-antd/message', 'ng-zorro-antd/modal', 'ng-zorro-antd/notification', 'ng-zorro-antd/page-header', 'ng-zorro-antd/pagination', 'ng-zorro-antd/popconfirm', 'ng-zorro-antd/popover', 'ng-zorro-antd/progress', 'ng-zorro-antd/radio', 'ng-zorro-antd/rate', 'ng-zorro-antd/select', 'ng-zorro-antd/skeleton', 'ng-zorro-antd/slider', 'ng-zorro-antd/spin', 'ng-zorro-antd/statistic', 'ng-zorro-antd/steps', 'ng-zorro-antd/switch', 'ng-zorro-antd/table', 'ng-zorro-antd/tabs', 'ng-zorro-antd/tag', 'ng-zorro-antd/time-picker', 'ng-zorro-antd/timeline', 'ng-zorro-antd/tooltip', 'ng-zorro-antd/transfer', 'ng-zorro-antd/tree', 'ng-zorro-antd/tree-select', 'ng-zorro-antd/upload', '@angular/core'], factory) :
    (factory((global['ng-zorro-antd'] = {}),global['ng-zorro-antd'].affix,global['ng-zorro-antd'].alert,global['ng-zorro-antd'].anchor,global['ng-zorro-antd']['auto-complete'],global['ng-zorro-antd'].avatar,global['ng-zorro-antd']['back-top'],global['ng-zorro-antd'].badge,global['ng-zorro-antd'].breadcrumb,global['ng-zorro-antd'].button,global['ng-zorro-antd'].calendar,global['ng-zorro-antd'].card,global['ng-zorro-antd'].carousel,global['ng-zorro-antd'].cascader,global['ng-zorro-antd'].checkbox,global['ng-zorro-antd'].collapse,global['ng-zorro-antd'].comment,global['ng-zorro-antd'].core,global['ng-zorro-antd']['date-picker'],global['ng-zorro-antd'].divider,global['ng-zorro-antd'].drawer,global['ng-zorro-antd'].dropdown,global['ng-zorro-antd'].empty,global['ng-zorro-antd'].form,global['ng-zorro-antd'].grid,global['ng-zorro-antd'].i18n,global['ng-zorro-antd'].icon,global['ng-zorro-antd'].input,global['ng-zorro-antd']['input-number'],global['ng-zorro-antd'].layout,global['ng-zorro-antd'].list,global['ng-zorro-antd'].mention,global['ng-zorro-antd'].menu,global['ng-zorro-antd'].message,global['ng-zorro-antd'].modal,global['ng-zorro-antd'].notification,global['ng-zorro-antd']['page-header'],global['ng-zorro-antd'].pagination,global['ng-zorro-antd'].popconfirm,global['ng-zorro-antd'].popover,global['ng-zorro-antd'].progress,global['ng-zorro-antd'].radio,global['ng-zorro-antd'].rate,global['ng-zorro-antd'].select,global['ng-zorro-antd'].skeleton,global['ng-zorro-antd'].slider,global['ng-zorro-antd'].spin,global['ng-zorro-antd'].statistic,global['ng-zorro-antd'].steps,global['ng-zorro-antd'].switch,global['ng-zorro-antd'].table,global['ng-zorro-antd'].tabs,global['ng-zorro-antd'].tag,global['ng-zorro-antd']['time-picker'],global['ng-zorro-antd'].timeline,global['ng-zorro-antd'].tooltip,global['ng-zorro-antd'].transfer,global['ng-zorro-antd'].tree,global['ng-zorro-antd']['tree-select'],global['ng-zorro-antd'].upload,global.ng.core));
}(this, (function (exports,affix,alert,anchor,autoComplete,avatar,backTop,badge,breadcrumb,button,calendar,card,carousel,cascader,checkbox,collapse,comment,core,datePicker,divider,drawer,dropdown,empty,form,grid,i18n,icon,input,inputNumber,layout,list,mention,menu,message,modal,notification,pageHeader,pagination,popconfirm,popover,progress,radio,rate,select,skeleton,slider,spin,statistic,steps,_switch,table,tabs,tag,timePicker,timeline,tooltip,transfer,tree,treeSelect,upload,core$1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var VERSION = new core$1.Version('7.3.3');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgZorroAntdModule = /** @class */ (function () {
        function NgZorroAntdModule() {
        }
        /**
         * @deprecated Use `NgZorroAntdModule` instead.
         */
        /**
         * @deprecated Use `NgZorroAntdModule` instead.
         * @return {?}
         */
        NgZorroAntdModule.forRoot = /**
         * @deprecated Use `NgZorroAntdModule` instead.
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgZorroAntdModule
                };
            };
        NgZorroAntdModule.decorators = [
            { type: core$1.NgModule, args: [{
                        exports: [
                            button.NzButtonModule,
                            calendar.NzCalendarModule,
                            grid.NzGridModule,
                            _switch.NzSwitchModule,
                            select.NzSelectModule,
                            menu.NzMenuModule,
                            mention.NzMentionModule,
                            anchor.NzAnchorModule,
                            affix.NzAffixModule,
                            dropdown.NzDropDownModule,
                            layout.NzLayoutModule,
                            breadcrumb.NzBreadCrumbModule,
                            pagination.NzPaginationModule,
                            steps.NzStepsModule,
                            input.NzInputModule,
                            checkbox.NzCheckboxModule,
                            inputNumber.NzInputNumberModule,
                            slider.NzSliderModule,
                            rate.NzRateModule,
                            badge.NzBadgeModule,
                            radio.NzRadioModule,
                            alert.NzAlertModule,
                            spin.NzSpinModule,
                            pageHeader.NzPageHeaderModule,
                            progress.NzProgressModule,
                            tabs.NzTabsModule,
                            icon.NzIconModule,
                            card.NzCardModule,
                            avatar.NzAvatarModule,
                            timeline.NzTimelineModule,
                            transfer.NzTransferModule,
                            carousel.NzCarouselModule,
                            collapse.NzCollapseModule,
                            comment.NzCommentModule,
                            table.NzTableModule,
                            datePicker.NzDatePickerModule,
                            divider.NzDividerModule,
                            drawer.NzDrawerModule,
                            form.NzFormModule,
                            list.NzListModule,
                            i18n.NzI18nModule,
                            upload.NzUploadModule,
                            autoComplete.NzAutocompleteModule,
                            tag.NzTagModule,
                            message.NzMessageModule,
                            notification.NzNotificationModule,
                            popover.NzPopoverModule,
                            tooltip.NzToolTipModule,
                            popconfirm.NzPopconfirmModule,
                            modal.NzModalModule,
                            backTop.NzBackTopModule,
                            cascader.NzCascaderModule,
                            tree.NzTreeModule,
                            treeSelect.NzTreeSelectModule,
                            timePicker.NzTimePickerModule,
                            core.NzWaveModule,
                            core.NzNoAnimationModule,
                            skeleton.NzSkeletonModule,
                            statistic.NzStatisticModule,
                            empty.NzEmptyModule
                        ]
                    },] }
        ];
        return NgZorroAntdModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NzAffixComponent = affix.NzAffixComponent;
    exports.NzAffixModule = affix.NzAffixModule;
    exports.NzAlertComponent = alert.NzAlertComponent;
    exports.NzAlertModule = alert.NzAlertModule;
    exports.NzAnchorLinkComponent = anchor.NzAnchorLinkComponent;
    exports.NzAnchorComponent = anchor.NzAnchorComponent;
    exports.NzAnchorModule = anchor.NzAnchorModule;
    exports.NzAutocompleteModule = autoComplete.NzAutocompleteModule;
    exports.NzAutocompleteComponent = autoComplete.NzAutocompleteComponent;
    exports.getNzAutocompleteMissingPanelError = autoComplete.getNzAutocompleteMissingPanelError;
    exports.NZ_AUTOCOMPLETE_VALUE_ACCESSOR = autoComplete.NZ_AUTOCOMPLETE_VALUE_ACCESSOR;
    exports.NzAutocompleteTriggerDirective = autoComplete.NzAutocompleteTriggerDirective;
    exports.NzOptionSelectionChange = autoComplete.NzOptionSelectionChange;
    exports.NzAutocompleteOptionComponent = autoComplete.NzAutocompleteOptionComponent;
    exports.NzAutocompleteOptgroupComponent = autoComplete.NzAutocompleteOptgroupComponent;
    exports.NzAvatarComponent = avatar.NzAvatarComponent;
    exports.NzAvatarModule = avatar.NzAvatarModule;
    exports.NzBackTopComponent = backTop.NzBackTopComponent;
    exports.NzBackTopModule = backTop.NzBackTopModule;
    exports.NzBadgeComponent = badge.NzBadgeComponent;
    exports.NzBadgeModule = badge.NzBadgeModule;
    exports.NzBreadCrumbItemComponent = breadcrumb.NzBreadCrumbItemComponent;
    exports.NZ_ROUTE_DATA_BREADCRUMB = breadcrumb.NZ_ROUTE_DATA_BREADCRUMB;
    exports.NzBreadCrumbComponent = breadcrumb.NzBreadCrumbComponent;
    exports.NzBreadCrumbModule = breadcrumb.NzBreadCrumbModule;
    exports.NzButtonComponent = button.NzButtonComponent;
    exports.NzButtonGroupComponent = button.NzButtonGroupComponent;
    exports.NzButtonModule = button.NzButtonModule;
    exports.NzCalendarModule = calendar.NzCalendarModule;
    exports.NzCalendarComponent = calendar.NzCalendarComponent;
    exports.NzDateCellDirective = calendar.NzDateCellDirective;
    exports.NzMonthCellDirective = calendar.NzMonthCellDirective;
    exports.NzDateFullCellDirective = calendar.NzDateFullCellDirective;
    exports.NzMonthFullCellDirective = calendar.NzMonthFullCellDirective;
    exports.NzCalendarHeaderComponent = calendar.NzCalendarHeaderComponent;
    exports.NzCardGridDirective = card.NzCardGridDirective;
    exports.NzCardComponent = card.NzCardComponent;
    exports.NzCardModule = card.NzCardModule;
    exports.NzCardLoadingComponent = card.NzCardLoadingComponent;
    exports.NzCardMetaComponent = card.NzCardMetaComponent;
    exports.NzCardTabComponent = card.NzCardTabComponent;
    exports.NzCarouselModule = carousel.NzCarouselModule;
    exports.NzCarouselComponent = carousel.NzCarouselComponent;
    exports.NzCarouselContentDirective = carousel.NzCarouselContentDirective;
    exports.isShowSearchObject = cascader.isShowSearchObject;
    exports.isChildOption = cascader.isChildOption;
    exports.isParentOption = cascader.isParentOption;
    exports.NzCascaderComponent = cascader.NzCascaderComponent;
    exports.NzCascaderModule = cascader.NzCascaderModule;
    exports.NzCascaderService = cascader.NzCascaderService;
    exports.NzCascaderOptionComponent = cascader.NzCascaderOptionComponent;
    exports.NzCheckboxComponent = checkbox.NzCheckboxComponent;
    exports.NzCheckboxModule = checkbox.NzCheckboxModule;
    exports.NzCheckboxGroupComponent = checkbox.NzCheckboxGroupComponent;
    exports.NzCheckboxWrapperComponent = checkbox.NzCheckboxWrapperComponent;
    exports.NzCollapsePanelComponent = collapse.NzCollapsePanelComponent;
    exports.NzCollapseComponent = collapse.NzCollapseComponent;
    exports.NzCollapseModule = collapse.NzCollapseModule;
    exports.NzCommentModule = comment.NzCommentModule;
    exports.NzCommentComponent = comment.NzCommentComponent;
    exports.NzCommentAvatarDirective = comment.NzCommentAvatarDirective;
    exports.NzCommentContentDirective = comment.NzCommentContentDirective;
    exports.NzCommentActionHostDirective = comment.NzCommentActionHostDirective;
    exports.NzCommentActionComponent = comment.NzCommentActionComponent;
    exports.NzAddOnModule = core.NzAddOnModule;
    exports.NzClassListAddDirective = core.NzClassListAddDirective;
    exports.NzStringTemplateOutletDirective = core.NzStringTemplateOutletDirective;
    exports.AnimationDuration = core.AnimationDuration;
    exports.AnimationCurves = core.AnimationCurves;
    exports.collapseMotion = core.collapseMotion;
    exports.fadeMotion = core.fadeMotion;
    exports.helpMotion = core.helpMotion;
    exports.moveUpMotion = core.moveUpMotion;
    exports.notificationMotion = core.notificationMotion;
    exports.slideMotion = core.slideMotion;
    exports.slideAlertMotion = core.slideAlertMotion;
    exports.zoomMotion = core.zoomMotion;
    exports.zoomBigMotion = core.zoomBigMotion;
    exports.zoomBadgeMotion = core.zoomBadgeMotion;
    exports.NzNoAnimationModule = core.NzNoAnimationModule;
    exports.NzNoAnimationDirective = core.NzNoAnimationDirective;
    exports.NzConnectedOverlayDirective = core.NzConnectedOverlayDirective;
    exports.NzOverlayModule = core.NzOverlayModule;
    exports.getPlacementName = core.getPlacementName;
    exports.POSITION_MAP = core.POSITION_MAP;
    exports.DEFAULT_TOOLTIP_POSITIONS = core.DEFAULT_TOOLTIP_POSITIONS;
    exports.DEFAULT_DROPDOWN_POSITIONS = core.DEFAULT_DROPDOWN_POSITIONS;
    exports.DEFAULT_SUBMENU_POSITIONS = core.DEFAULT_SUBMENU_POSITIONS;
    exports.DEFAULT_CASCADER_POSITIONS = core.DEFAULT_CASCADER_POSITIONS;
    exports.DEFAULT_MENTION_POSITIONS = core.DEFAULT_MENTION_POSITIONS;
    exports.cancelRequestAnimationFrame = core.cancelRequestAnimationFrame;
    exports.reqAnimFrame = core.reqAnimFrame;
    exports.SCROLL_SERVICE_PROVIDER_FACTORY = core.SCROLL_SERVICE_PROVIDER_FACTORY;
    exports.NzScrollService = core.NzScrollService;
    exports.SCROLL_SERVICE_PROVIDER = core.SCROLL_SERVICE_PROVIDER;
    exports.NzMeasureScrollbarService = core.NzMeasureScrollbarService;
    exports.NzUpdateHostClassService = core.NzUpdateHostClassService;
    exports.dispatchEvent = core.dispatchEvent;
    exports.dispatchFakeEvent = core.dispatchFakeEvent;
    exports.dispatchKeyboardEvent = core.dispatchKeyboardEvent;
    exports.dispatchMouseEvent = core.dispatchMouseEvent;
    exports.dispatchTouchEvent = core.dispatchTouchEvent;
    exports.createMouseEvent = core.createMouseEvent;
    exports.createTouchEvent = core.createTouchEvent;
    exports.createKeyboardEvent = core.createKeyboardEvent;
    exports.createFakeEvent = core.createFakeEvent;
    exports.typeInElement = core.typeInElement;
    exports.wrappedErrorMessage = core.wrappedErrorMessage;
    exports.FakeViewportRuler = core.FakeViewportRuler;
    exports.MockNgZone = core.MockNgZone;
    exports.NzTreeNode = core.NzTreeNode;
    exports.NzTreeBaseService = core.NzTreeBaseService;
    exports.NzTreeHigherOrderServiceToken = core.NzTreeHigherOrderServiceToken;
    exports.NzTreeBase = core.NzTreeBase;
    exports.toArray = core.toArray;
    exports.arraysEqual = core.arraysEqual;
    exports.shallowCopyArray = core.shallowCopyArray;
    exports.isNotNil = core.isNotNil;
    exports.isNil = core.isNil;
    exports.shallowEqual = core.shallowEqual;
    exports.isInteger = core.isInteger;
    exports.isEmpty = core.isEmpty;
    exports.filterNotEmptyNode = core.filterNotEmptyNode;
    exports.isNonEmptyString = core.isNonEmptyString;
    exports.isTemplateRef = core.isTemplateRef;
    exports.isComponent = core.isComponent;
    exports.toBoolean = core.toBoolean;
    exports.toNumber = core.toNumber;
    exports.toCssPixel = core.toCssPixel;
    exports.valueFunctionProp = core.valueFunctionProp;
    exports.InputBoolean = core.InputBoolean;
    exports.InputCssPixel = core.InputCssPixel;
    exports.InputNumber = core.InputNumber;
    exports.silentEvent = core.silentEvent;
    exports.getElementOffset = core.getElementOffset;
    exports.findFirstNotEmptyNode = core.findFirstNotEmptyNode;
    exports.findLastNotEmptyNode = core.findLastNotEmptyNode;
    exports.reverseChildNodes = core.reverseChildNodes;
    exports.isTouchEvent = core.isTouchEvent;
    exports.getRegExp = core.getRegExp;
    exports.getMentions = core.getMentions;
    exports.padStart = core.padStart;
    exports.padEnd = core.padEnd;
    exports.getRepeatedElement = core.getRepeatedElement;
    exports.isPromise = core.isPromise;
    exports.getPercent = core.getPercent;
    exports.getPrecision = core.getPrecision;
    exports.ensureNumberInRange = core.ensureNumberInRange;
    exports.scrollIntoView = core.scrollIntoView;
    exports.getCaretCoordinates = core.getCaretCoordinates;
    exports.createDebugEle = core.createDebugEle;
    exports.properties = core.properties;
    exports.throttleByAnimationFrameDecorator = core.throttleByAnimationFrameDecorator;
    exports.timeUnits = core.timeUnits;
    exports.NzWaveRenderer = core.NzWaveRenderer;
    exports.NZ_WAVE_GLOBAL_CONFIG_FACTORY = core.NZ_WAVE_GLOBAL_CONFIG_FACTORY;
    exports.NZ_WAVE_GLOBAL_DEFAULT_CONFIG = core.NZ_WAVE_GLOBAL_DEFAULT_CONFIG;
    exports.NZ_WAVE_GLOBAL_CONFIG = core.NZ_WAVE_GLOBAL_CONFIG;
    exports.NzWaveDirective = core.NzWaveDirective;
    exports.NzWaveModule = core.NzWaveModule;
    exports.NzMenuBaseService = core.NzMenuBaseService;
    exports.NzDropdownHigherOrderServiceToken = core.NzDropdownHigherOrderServiceToken;
    exports.LoggerModule = core.LoggerModule;
    exports.LoggerService = core.LoggerService;
    exports.NZ_LOGGER_STATE = core.NZ_LOGGER_STATE;
    exports.LOGGER_SERVICE_PROVIDER = core.LOGGER_SERVICE_PROVIDER;
    exports.LOGGER_SERVICE_PROVIDER_FACTORY = core.LOGGER_SERVICE_PROVIDER_FACTORY;
    exports.ɵp = datePicker.ɵp;
    exports.ɵo = datePicker.ɵo;
    exports.ɵr = datePicker.ɵr;
    exports.ɵd = datePicker.ɵd;
    exports.ɵb = datePicker.ɵb;
    exports.ɵc = datePicker.ɵc;
    exports.ɵe = datePicker.ɵe;
    exports.ɵf = datePicker.ɵf;
    exports.ɵg = datePicker.ɵg;
    exports.ɵh = datePicker.ɵh;
    exports.ɵl = datePicker.ɵl;
    exports.ɵa = datePicker.ɵa;
    exports.ɵj = datePicker.ɵj;
    exports.ɵk = datePicker.ɵk;
    exports.ɵn = datePicker.ɵn;
    exports.ɵm = datePicker.ɵm;
    exports.ɵi = datePicker.ɵi;
    exports.ɵq = datePicker.ɵq;
    exports.CandyDate = datePicker.CandyDate;
    exports.NzDatePickerModule = datePicker.NzDatePickerModule;
    exports.NzDatePickerComponent = datePicker.NzDatePickerComponent;
    exports.NzRangePickerComponent = datePicker.NzRangePickerComponent;
    exports.NzMonthPickerComponent = datePicker.NzMonthPickerComponent;
    exports.NzWeekPickerComponent = datePicker.NzWeekPickerComponent;
    exports.NzYearPickerComponent = datePicker.NzYearPickerComponent;
    exports.NzDividerComponent = divider.NzDividerComponent;
    exports.NzDividerModule = divider.NzDividerModule;
    exports.DRAWER_ANIMATE_DURATION = drawer.DRAWER_ANIMATE_DURATION;
    exports.NzDrawerComponent = drawer.NzDrawerComponent;
    exports.NzDrawerModule = drawer.NzDrawerModule;
    exports.DrawerBuilderForService = drawer.DrawerBuilderForService;
    exports.NzDrawerService = drawer.NzDrawerService;
    exports.NzDrawerRef = drawer.NzDrawerRef;
    exports.NzDropdownContextComponent = dropdown.NzDropdownContextComponent;
    exports.menuServiceFactory = dropdown.menuServiceFactory;
    exports.NzDropDownComponent = dropdown.NzDropDownComponent;
    exports.NzDropDownDirective = dropdown.NzDropDownDirective;
    exports.NzDropdownService = dropdown.NzDropdownService;
    exports.NzDropDownButtonComponent = dropdown.NzDropDownButtonComponent;
    exports.NzDropDownModule = dropdown.NzDropDownModule;
    exports.NzMenuDropdownService = dropdown.NzMenuDropdownService;
    exports.NzDropDownADirective = dropdown.NzDropDownADirective;
    exports.NzEmbedEmptyComponent = empty.NzEmbedEmptyComponent;
    exports.NzEmptyComponent = empty.NzEmptyComponent;
    exports.NzEmptyModule = empty.NzEmptyModule;
    exports.NzEmptyService = empty.NzEmptyService;
    exports.NZ_DEFAULT_EMPTY_CONTENT = empty.NZ_DEFAULT_EMPTY_CONTENT;
    exports.NZ_EMPTY_COMPONENT_NAME = empty.NZ_EMPTY_COMPONENT_NAME;
    exports.emptyImage = empty.emptyImage;
    exports.simpleEmptyImage = empty.simpleEmptyImage;
    exports.NzFormModule = form.NzFormModule;
    exports.NzFormDirective = form.NzFormDirective;
    exports.NzFormControlComponent = form.NzFormControlComponent;
    exports.NzFormExplainComponent = form.NzFormExplainComponent;
    exports.NzFormItemComponent = form.NzFormItemComponent;
    exports.NzFormExtraComponent = form.NzFormExtraComponent;
    exports.NzFormLabelComponent = form.NzFormLabelComponent;
    exports.NzFormSplitComponent = form.NzFormSplitComponent;
    exports.NzFormTextComponent = form.NzFormTextComponent;
    exports.Breakpoint = grid.Breakpoint;
    exports.NzRowDirective = grid.NzRowDirective;
    exports.NzColDirective = grid.NzColDirective;
    exports.NzGridModule = grid.NzGridModule;
    exports.NzI18nModule = i18n.NzI18nModule;
    exports.NzI18nService = i18n.NzI18nService;
    exports.NZ_DATE_CONFIG = i18n.NZ_DATE_CONFIG;
    exports.ar_EG = i18n.ar_EG;
    exports.bg_BG = i18n.bg_BG;
    exports.ca_ES = i18n.ca_ES;
    exports.cs_CZ = i18n.cs_CZ;
    exports.da_DK = i18n.da_DK;
    exports.de_DE = i18n.de_DE;
    exports.el_GR = i18n.el_GR;
    exports.en_GB = i18n.en_GB;
    exports.en_US = i18n.en_US;
    exports.es_ES = i18n.es_ES;
    exports.et_EE = i18n.et_EE;
    exports.fa_IR = i18n.fa_IR;
    exports.fi_FI = i18n.fi_FI;
    exports.fr_BE = i18n.fr_BE;
    exports.fr_FR = i18n.fr_FR;
    exports.is_IS = i18n.is_IS;
    exports.it_IT = i18n.it_IT;
    exports.ja_JP = i18n.ja_JP;
    exports.ko_KR = i18n.ko_KR;
    exports.nb_NO = i18n.nb_NO;
    exports.nl_BE = i18n.nl_BE;
    exports.nl_NL = i18n.nl_NL;
    exports.pl_PL = i18n.pl_PL;
    exports.pt_BR = i18n.pt_BR;
    exports.pt_PT = i18n.pt_PT;
    exports.ru_RU = i18n.ru_RU;
    exports.sk_SK = i18n.sk_SK;
    exports.sl_SI = i18n.sl_SI;
    exports.sr_RS = i18n.sr_RS;
    exports.sv_SE = i18n.sv_SE;
    exports.th_TH = i18n.th_TH;
    exports.tr_TR = i18n.tr_TR;
    exports.uk_UA = i18n.uk_UA;
    exports.vi_VN = i18n.vi_VN;
    exports.zh_CN = i18n.zh_CN;
    exports.zh_TW = i18n.zh_TW;
    exports.NZ_I18N = i18n.NZ_I18N;
    exports.NZ_DATE_LOCALE = i18n.NZ_DATE_LOCALE;
    exports.DATE_HELPER_SERVICE_FACTORY = i18n.DATE_HELPER_SERVICE_FACTORY;
    exports.DateHelperService = i18n.DateHelperService;
    exports.DateHelperByDateFns = i18n.DateHelperByDateFns;
    exports.DateHelperByDatePipe = i18n.DateHelperByDatePipe;
    exports.NzI18nPipe = i18n.NzI18nPipe;
    exports.NzIconModule = icon.NzIconModule;
    exports.NzIconDirective = icon.NzIconDirective;
    exports.NZ_ICONS = icon.NZ_ICONS;
    exports.NZ_ICON_DEFAULT_TWOTONE_COLOR = icon.NZ_ICON_DEFAULT_TWOTONE_COLOR;
    exports.DEFAULT_TWOTONE_COLOR = icon.DEFAULT_TWOTONE_COLOR;
    exports.NZ_ICONS_USED_BY_ZORRO = icon.NZ_ICONS_USED_BY_ZORRO;
    exports.NzIconService = icon.NzIconService;
    exports.NzInputGroupComponent = input.NzInputGroupComponent;
    exports.NzInputModule = input.NzInputModule;
    exports.NzInputDirective = input.NzInputDirective;
    exports.isAutoSizeType = input.isAutoSizeType;
    exports.NzAutosizeDirective = input.NzAutosizeDirective;
    exports.NzInputNumberComponent = inputNumber.NzInputNumberComponent;
    exports.NzInputNumberModule = inputNumber.NzInputNumberModule;
    exports.NzContentComponent = layout.NzContentComponent;
    exports.NzFooterComponent = layout.NzFooterComponent;
    exports.NzHeaderComponent = layout.NzHeaderComponent;
    exports.NzLayoutComponent = layout.NzLayoutComponent;
    exports.NzSiderComponent = layout.NzSiderComponent;
    exports.NzLayoutModule = layout.NzLayoutModule;
    exports.NzListItemMetaComponent = list.NzListItemMetaComponent;
    exports.NzListItemComponent = list.NzListItemComponent;
    exports.NzListComponent = list.NzListComponent;
    exports.NzListModule = list.NzListModule;
    exports.NzMentionModule = mention.NzMentionModule;
    exports.NzMentionComponent = mention.NzMentionComponent;
    exports.NZ_MENTION_TRIGGER_ACCESSOR = mention.NZ_MENTION_TRIGGER_ACCESSOR;
    exports.NzMentionTriggerDirective = mention.NzMentionTriggerDirective;
    exports.NzMentionSuggestionDirective = mention.NzMentionSuggestionDirective;
    exports.NzMenuDirective = menu.NzMenuDirective;
    exports.NzMenuGroupComponent = menu.NzMenuGroupComponent;
    exports.NzMenuDividerDirective = menu.NzMenuDividerDirective;
    exports.NzMenuItemDirective = menu.NzMenuItemDirective;
    exports.NzSubMenuComponent = menu.NzSubMenuComponent;
    exports.NzMenuModule = menu.NzMenuModule;
    exports.NzMenuService = menu.NzMenuService;
    exports.NzSubmenuService = menu.NzSubmenuService;
    exports.NzMenuServiceFactory = menu.NzMenuServiceFactory;
    exports.NzMessageBaseService = message.NzMessageBaseService;
    exports.NzMessageService = message.NzMessageService;
    exports.NzMessageModule = message.NzMessageModule;
    exports.NzMessageComponent = message.NzMessageComponent;
    exports.NzMessageContainerComponent = message.NzMessageContainerComponent;
    exports.NZ_MESSAGE_DEFAULT_CONFIG = message.NZ_MESSAGE_DEFAULT_CONFIG;
    exports.NZ_MESSAGE_CONFIG = message.NZ_MESSAGE_CONFIG;
    exports.NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER = message.NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER;
    exports.NzModalComponent = modal.NzModalComponent;
    exports.NzModalRef = modal.NzModalRef;
    exports.NzModalModule = modal.NzModalModule;
    exports.NzModalService = modal.NzModalService;
    exports.NZ_MODAL_CONFIG = modal.NZ_MODAL_CONFIG;
    exports.NzModalControlService = modal.NzModalControlService;
    exports.CssUnitPipe = modal.CssUnitPipe;
    exports.NZ_NOTIFICATION_DEFAULT_CONFIG = notification.NZ_NOTIFICATION_DEFAULT_CONFIG;
    exports.NZ_NOTIFICATION_CONFIG = notification.NZ_NOTIFICATION_CONFIG;
    exports.NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = notification.NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER;
    exports.NzNotificationComponent = notification.NzNotificationComponent;
    exports.NzNotificationModule = notification.NzNotificationModule;
    exports.NzNotificationService = notification.NzNotificationService;
    exports.NzNotificationContainerComponent = notification.NzNotificationContainerComponent;
    exports.NzPageHeaderModule = pageHeader.NzPageHeaderModule;
    exports.NzPageHeaderComponent = pageHeader.NzPageHeaderComponent;
    exports.NzPageHeaderTitleDirective = pageHeader.NzPageHeaderTitleDirective;
    exports.NzPageHeaderSubtitleDirective = pageHeader.NzPageHeaderSubtitleDirective;
    exports.NzPageHeaderContentDirective = pageHeader.NzPageHeaderContentDirective;
    exports.NzPageHeaderTagDirective = pageHeader.NzPageHeaderTagDirective;
    exports.NzPageHeaderExtraDirective = pageHeader.NzPageHeaderExtraDirective;
    exports.NzPageHeaderFooterDirective = pageHeader.NzPageHeaderFooterDirective;
    exports.NzPageHeaderBreadcrumbDirective = pageHeader.NzPageHeaderBreadcrumbDirective;
    exports.NzPaginationComponent = pagination.NzPaginationComponent;
    exports.NzPaginationModule = pagination.NzPaginationModule;
    exports.NzPopconfirmComponent = popconfirm.NzPopconfirmComponent;
    exports.NzPopconfirmDirective = popconfirm.NzPopconfirmDirective;
    exports.NzPopconfirmModule = popconfirm.NzPopconfirmModule;
    exports.NzPopoverComponent = popover.NzPopoverComponent;
    exports.NzPopoverDirective = popover.NzPopoverDirective;
    exports.NzPopoverModule = popover.NzPopoverModule;
    exports.NzProgressModule = progress.NzProgressModule;
    exports.NzProgressComponent = progress.NzProgressComponent;
    exports.NzRadioButtonComponent = radio.NzRadioButtonComponent;
    exports.NzRadioGroupComponent = radio.NzRadioGroupComponent;
    exports.NzRadioComponent = radio.NzRadioComponent;
    exports.NzRadioModule = radio.NzRadioModule;
    exports.NzRateComponent = rate.NzRateComponent;
    exports.NzRateModule = rate.NzRateModule;
    exports.NzRateItemComponent = rate.NzRateItemComponent;
    exports.NzOptionGroupComponent = select.NzOptionGroupComponent;
    exports.NzOptionContainerComponent = select.NzOptionContainerComponent;
    exports.NzOptionComponent = select.NzOptionComponent;
    exports.NzSelectComponent = select.NzSelectComponent;
    exports.NzSelectModule = select.NzSelectModule;
    exports.NzOptionLiComponent = select.NzOptionLiComponent;
    exports.defaultFilterOption = select.defaultFilterOption;
    exports.NzFilterOptionPipe = select.NzFilterOptionPipe;
    exports.NzFilterGroupOptionPipe = select.NzFilterGroupOptionPipe;
    exports.NzSelectTopControlComponent = select.NzSelectTopControlComponent;
    exports.NzSelectUnselectableDirective = select.NzSelectUnselectableDirective;
    exports.NzSelectService = select.NzSelectService;
    exports.NzSkeletonComponent = skeleton.NzSkeletonComponent;
    exports.NzSkeletonModule = skeleton.NzSkeletonModule;
    exports.NzSliderComponent = slider.NzSliderComponent;
    exports.NzSliderModule = slider.NzSliderModule;
    exports.NzSliderHandleComponent = slider.NzSliderHandleComponent;
    exports.NzSliderMarksComponent = slider.NzSliderMarksComponent;
    exports.NzSliderStepComponent = slider.NzSliderStepComponent;
    exports.NzSliderTrackComponent = slider.NzSliderTrackComponent;
    exports.isValueARange = slider.isValueARange;
    exports.isConfigAObject = slider.isConfigAObject;
    exports.Marks = slider.Marks;
    exports.NzSpinComponent = spin.NzSpinComponent;
    exports.NzSpinModule = spin.NzSpinModule;
    exports.NzCountdownComponent = statistic.NzCountdownComponent;
    exports.NzStatisticComponent = statistic.NzStatisticComponent;
    exports.NzStatisticModule = statistic.NzStatisticModule;
    exports.NzStatisticNumberComponent = statistic.NzStatisticNumberComponent;
    exports.NzTimeRangePipe = statistic.NzTimeRangePipe;
    exports.NzStepsComponent = steps.NzStepsComponent;
    exports.NzStepComponent = steps.NzStepComponent;
    exports.NzStepsModule = steps.NzStepsModule;
    exports.NzSwitchComponent = _switch.NzSwitchComponent;
    exports.NzSwitchModule = _switch.NzSwitchModule;
    exports.NzTableComponent = table.NzTableComponent;
    exports.NzTableModule = table.NzTableModule;
    exports.NzTbodyDirective = table.NzTbodyDirective;
    exports.NzTdComponent = table.NzTdComponent;
    exports.NzThComponent = table.NzThComponent;
    exports.NzTheadComponent = table.NzTheadComponent;
    exports.NzTrDirective = table.NzTrDirective;
    exports.NzVirtualScrollDirective = table.NzVirtualScrollDirective;
    exports.NzTabBodyComponent = tabs.NzTabBodyComponent;
    exports.NzTabLabelDirective = tabs.NzTabLabelDirective;
    exports.NzTabComponent = tabs.NzTabComponent;
    exports.NzTabsInkBarDirective = tabs.NzTabsInkBarDirective;
    exports.NzTabsModule = tabs.NzTabsModule;
    exports.NzTabsNavComponent = tabs.NzTabsNavComponent;
    exports.NzTabChangeEvent = tabs.NzTabChangeEvent;
    exports.NzTabSetComponent = tabs.NzTabSetComponent;
    exports.NzTabDirective = tabs.NzTabDirective;
    exports.NzTagComponent = tag.NzTagComponent;
    exports.NzTagModule = tag.NzTagModule;
    exports.NzTimePickerComponent = timePicker.NzTimePickerComponent;
    exports.NzTimePickerModule = timePicker.NzTimePickerModule;
    exports.NzTimePickerPanelComponent = timePicker.NzTimePickerPanelComponent;
    exports.NzTimeValueAccessorDirective = timePicker.NzTimeValueAccessorDirective;
    exports.NzTimelineItemComponent = timeline.NzTimelineItemComponent;
    exports.NzTimelineComponent = timeline.NzTimelineComponent;
    exports.NzTimelineModule = timeline.NzTimelineModule;
    exports.NzToolTipComponent = tooltip.NzToolTipComponent;
    exports.NzTooltipDirective = tooltip.NzTooltipDirective;
    exports.NzToolTipModule = tooltip.NzToolTipModule;
    exports.NzTransferListComponent = transfer.NzTransferListComponent;
    exports.NzTransferSearchComponent = transfer.NzTransferSearchComponent;
    exports.NzTransferComponent = transfer.NzTransferComponent;
    exports.NzTransferModule = transfer.NzTransferModule;
    exports.NzTreeModule = tree.NzTreeModule;
    exports.NzTreeServiceFactory = tree.NzTreeServiceFactory;
    exports.NzTreeComponent = tree.NzTreeComponent;
    exports.NzTreeNodeComponent = tree.NzTreeNodeComponent;
    exports.NzTreeService = tree.NzTreeService;
    exports.higherOrderServiceFactory = treeSelect.higherOrderServiceFactory;
    exports.NzTreeSelectComponent = treeSelect.NzTreeSelectComponent;
    exports.NzTreeSelectModule = treeSelect.NzTreeSelectModule;
    exports.NzTreeSelectService = treeSelect.NzTreeSelectService;
    exports.NzUploadBtnComponent = upload.NzUploadBtnComponent;
    exports.NzUploadListComponent = upload.NzUploadListComponent;
    exports.NzUploadComponent = upload.NzUploadComponent;
    exports.NzUploadModule = upload.NzUploadModule;
    exports.NgZorroAntdModule = NgZorroAntdModule;
    exports.VERSION = VERSION;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-zorro-antd.umd.js.map
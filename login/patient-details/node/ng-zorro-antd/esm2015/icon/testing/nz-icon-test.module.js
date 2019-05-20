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
import { NgModule } from '@angular/core';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
/** @type {?} */
const antDesignIcons = (/** @type {?} */ (AllIcons));
const ɵ0 = /**
 * @param {?} key
 * @return {?}
 */
key => antDesignIcons[key];
/** @type {?} */
const icons = Object.keys(antDesignIcons).map((ɵ0));
const ɵ1 = icons;
/**
 * Include this module in every testing spec, except `nz-icon.spec.ts`.
 */
// @dynamic
export class NzIconTestModule {
}
NzIconTestModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzIconModule],
                providers: [
                    {
                        provide: NZ_ICONS,
                        useValue: ɵ1
                    }
                ]
            },] }
];
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaWNvbi10ZXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvaWNvbi90ZXN0aW5nLyIsInNvdXJjZXMiOlsibnotaWNvbi10ZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztNQUV0RCxjQUFjLEdBQUcsbUJBQUEsUUFBUSxFQUU5Qjs7Ozs7QUFFK0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDOztNQUFwRixLQUFLLEdBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxNQUE0QjtXQVczRSxLQUFLOzs7OztBQUlyQixNQUFNLE9BQU8sZ0JBQWdCOzs7WUFUNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxRQUFRO3dCQUNqQixRQUFRLElBQU87cUJBQ2hCO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWxpYmFiYS5jb20gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5pbXBvcnQgKiBhcyBBbGxJY29ucyBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyL2ljb25zJztcblxuaW1wb3J0IHsgTnpJY29uTW9kdWxlLCBOWl9JQ09OUyB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmNvbnN0IGFudERlc2lnbkljb25zID0gQWxsSWNvbnMgYXMge1xuICBba2V5OiBzdHJpbmddOiBJY29uRGVmaW5pdGlvbjtcbn07XG5cbmNvbnN0IGljb25zOiBJY29uRGVmaW5pdGlvbltdID0gT2JqZWN0LmtleXMoYW50RGVzaWduSWNvbnMpLm1hcChrZXkgPT4gYW50RGVzaWduSWNvbnNba2V5XSk7XG5cbi8qKlxuICogSW5jbHVkZSB0aGlzIG1vZHVsZSBpbiBldmVyeSB0ZXN0aW5nIHNwZWMsIGV4Y2VwdCBgbnotaWNvbi5zcGVjLnRzYC5cbiAqL1xuLy8gQGR5bmFtaWNcbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtOekljb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOWl9JQ09OUyxcbiAgICAgIHVzZVZhbHVlOiBpY29uc1xuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekljb25UZXN0TW9kdWxlIHt9XG4iXX0=
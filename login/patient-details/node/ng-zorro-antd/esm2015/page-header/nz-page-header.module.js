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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderBreadcrumbDirective, NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective, NzPageHeaderTitleDirective } from './nz-page-header-cells';
import { NzPageHeaderComponent } from './nz-page-header.component';
/** @type {?} */
const NzPageHeaderCells = [
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderTagDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderFooterDirective,
    NzPageHeaderBreadcrumbDirective
];
export class NzPageHeaderModule {
}
NzPageHeaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzAddOnModule, NzIconModule, NzDividerModule],
                exports: [NzPageHeaderComponent, ...NzPageHeaderCells],
                declarations: [NzPageHeaderComponent, ...NzPageHeaderCells]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9wYWdlLWhlYWRlci8iLCJzb3VyY2VzIjpbIm56LXBhZ2UtaGVhZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFDTCwrQkFBK0IsRUFDL0IsNEJBQTRCLEVBQzVCLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzdCLHdCQUF3QixFQUN4QiwwQkFBMEIsRUFDM0IsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7TUFFN0QsaUJBQWlCLEdBQUc7SUFDeEIsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw0QkFBNEI7SUFDNUIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDM0IsK0JBQStCO0NBQ2hDO0FBT0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBTDlCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3RELFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsaUJBQWlCLENBQUM7YUFDNUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWxpYmFiYS5jb20gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56QWRkT25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUnO1xuaW1wb3J0IHsgTnpEaXZpZGVyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kaXZpZGVyJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7XG4gIE56UGFnZUhlYWRlckJyZWFkY3J1bWJEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlckNvbnRlbnREaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlckV4dHJhRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlclN1YnRpdGxlRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJUYWdEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlclRpdGxlRGlyZWN0aXZlXG59IGZyb20gJy4vbnotcGFnZS1oZWFkZXItY2VsbHMnO1xuaW1wb3J0IHsgTnpQYWdlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uei1wYWdlLWhlYWRlci5jb21wb25lbnQnO1xuXG5jb25zdCBOelBhZ2VIZWFkZXJDZWxscyA9IFtcbiAgTnpQYWdlSGVhZGVyVGl0bGVEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlclN1YnRpdGxlRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJDb250ZW50RGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJUYWdEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlckV4dHJhRGlyZWN0aXZlLFxuICBOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmUsXG4gIE56UGFnZUhlYWRlckJyZWFkY3J1bWJEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56QWRkT25Nb2R1bGUsIE56SWNvbk1vZHVsZSwgTnpEaXZpZGVyTW9kdWxlXSxcbiAgZXhwb3J0czogW056UGFnZUhlYWRlckNvbXBvbmVudCwgLi4uTnpQYWdlSGVhZGVyQ2VsbHNdLFxuICBkZWNsYXJhdGlvbnM6IFtOelBhZ2VIZWFkZXJDb21wb25lbnQsIC4uLk56UGFnZUhlYWRlckNlbGxzXVxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2VIZWFkZXJNb2R1bGUge31cbiJdfQ==
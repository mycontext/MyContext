import { EventEmitter } from '@angular/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { CandyDate } from '../candy-date/candy-date';
export declare class MonthPanelComponent {
    locale: NzCalendarI18nInterface;
    value: CandyDate;
    disabledDate: (date: Date) => boolean;
    readonly valueChange: EventEmitter<CandyDate>;
    readonly yearPanelShow: EventEmitter<void>;
    prefixCls: string;
    previousYear(): void;
    nextYear(): void;
    private gotoYear;
}

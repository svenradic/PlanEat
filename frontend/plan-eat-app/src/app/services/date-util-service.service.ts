import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DateUtilService {
  formatForPage(date: Date): string {
    return formatDate(date, 'dd.MM.yyyy.', 'en-US');
  }

  formatForServer(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  parseFromPageFormat(dateStr: string): Date {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})\.$/.exec(dateStr);
    if (!match) throw new Error('Invalid date format');
    const [, day, month, year] = match;
    return new Date(+year, +month - 1, +day);
  }

  parseFromServerFormat(dateStr: string): Date {
    return new Date(dateStr); // works for yyyy-MM-dd
  }
}

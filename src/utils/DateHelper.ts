export enum DateFormatPattern {
  MONTH_DAY_PADDED_YEAR = 'MONTH_DAY_PADDED_YEAR',
  MONTH_DAY_SINGLE_YEAR = 'MONTH_DAY_SINGLE_YEAR',
  DAY_PADDED_MONTH_YEAR = 'DAY_PADDED_MONTH_YEAR',
  DAY_SINGLE_MONTH_YEAR = 'DAY_SINGLE_MONTH_YEAR'
}

export class DateHelper {
  public static getOffsetDate(daysOffset: number): Date {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOffset);
    return targetDate;
  }

  public static getAgodaAriaLabelPattern(
    date: Date,
    pattern: DateFormatPattern = DateFormatPattern.MONTH_DAY_PADDED_YEAR
  ): string {
    const month = date.toLocaleString('en-US', {
      month: 'short'
    });
    const dayPadded = String(date.getDate()).padStart(
      2,
      '0'
    );
    const daySingle = String(date.getDate());
    const year = date.getFullYear();

    switch (pattern) {
      case DateFormatPattern.MONTH_DAY_PADDED_YEAR:
        return `${month} ${dayPadded} ${year}`;
      case DateFormatPattern.MONTH_DAY_SINGLE_YEAR:
        return `${month} ${daySingle} ${year}`;
      case DateFormatPattern.DAY_PADDED_MONTH_YEAR:
        return `${dayPadded} ${month} ${year}`;
      case DateFormatPattern.DAY_SINGLE_MONTH_YEAR:
        return `${daySingle} ${month} ${year}`;
      default:
        return `${month} ${dayPadded} ${year}`;
    }
  }
}

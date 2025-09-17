import ErrorUtil from '@common/utils/ErrorUtil';

import { FinanceNotificationFrequencyType } from '@finance/types/FinanceNotificationType';
import { FINANCE_NOTIFICATION_FREQUENCY } from '@finance/consts/FinanceNotificationConst';

export default class FrequencyUtil {
  public static formatFrequency(frequency: FinanceNotificationFrequencyType): string {
    switch (frequency) {
      case FINANCE_NOTIFICATION_FREQUENCY.MINUTE_LEVEL:
        return '1分ごと';
      case FINANCE_NOTIFICATION_FREQUENCY.TEN_MINUTE_LEVEL:
        return '10分ごと';
      case FINANCE_NOTIFICATION_FREQUENCY.HOURLY_LEVEL:
        return '1時間ごと';
      case FINANCE_NOTIFICATION_FREQUENCY.EXCHANGE_START_ONLY:
        return '取引開始時のみ';
      default:
        ErrorUtil.throwError(`Unknown frequency type: ${frequency}`);
    }
  }
}
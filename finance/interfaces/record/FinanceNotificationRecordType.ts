import { FinanceNotificationConditionType, FinanceNotificationTimeFrameType } from '@finance/types/FinanceNotificationType';
import { FinanceRecordTypeBase } from '@finance/interfaces/record/FinanceRecordTypeBase';
import { FINANCE_RECORD_DATA_TYPE } from '@finance/types/FinanceRecordDataType';

export interface FinanceNotificationRecordType extends FinanceRecordTypeBase {
  DataType: typeof FINANCE_RECORD_DATA_TYPE.FINANCE_NOTIFICATION;
  TerminalID: string;
  SubscriptionEndpoint: string;
  SubscriptionKeysP256dh: string;
  SubscriptionKeysAuth: string;
  ExchangeID: string;
  TickerID: string;
  ConditionType: FinanceNotificationConditionType;
  ConditionValue: number;
  TimeFrame: FinanceNotificationTimeFrameType;
}

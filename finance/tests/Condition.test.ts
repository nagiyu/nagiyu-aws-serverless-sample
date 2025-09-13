jest.mock('@finance/utils/FinanceUtil', () => {
  return {
    __esModule: true,
    default: require('@finance/tests/mocks/utils/FinanceUtilMock').default
  };
});

jest.mock('@finance/services/TickerService', () => {
  return {
    __esModule: true,
    default: require('@finance/tests/mocks/services/TickerServiceMock').default
  };
});

import ConditionService from '@finance/services/ConditionService';
import FinanceUtilMock from '@finance/tests/mocks/utils/FinanceUtilMock';
import SansenAkenomyojoCondition from '@finance/conditions/SansenAkenomyojoCondition';
import TickerServiceMock from '@finance/tests/mocks/services/TickerServiceMock';
import { EXCHANGE_SESSION } from '@finance/consts/ExchangeConsts';

describe('ConditionTest', () => {
  let service: ConditionService;

  beforeEach(() => {
    service = new ConditionService();
  });

  describe('三川明けの明星', () => {
    const conditionKey = 'SansenAkenomyojo';

    it('Contains in Condition List', () => {
      const conditionList = service.getConditionList();
      expect(conditionList).toContain(conditionKey);
    });

    it('Get Condition Info', () => {
      const info = service.getConditionInfo(conditionKey);
      expect(info.name).toBe('三川明けの明星');
      expect(info.isBuyCondition).toBe(true);
      expect(info.isSellCondition).toBe(false);
    });

    it('Get Condition', () => {
      const ConditionClass = service.getCondition(conditionKey);
      expect(ConditionClass).toBe(SansenAkenomyojoCondition);
    });

    it('Check Condition', async () => {
      FinanceUtilMock.StockPriceDataMock = [
        {
          date: '2025-01-01 00:00',
          data: [1000, 960, 950, 1010]
        },
        {
          date: '2025-01-02 00:00',
          data: [940, 950, 930, 960]
        },
        {
          date: '2025-01-03 00:00',
          data: [970, 1010, 970, 1020]
        }
      ];

      const result = await service.checkCondition(conditionKey, 'MOCK_EXCHANGE', 'MOCK_TICKER', EXCHANGE_SESSION.EXTENDED);

      expect(result.met).toBe(true);
      expect(result.message).toBe(`${TickerServiceMock.MockTickerName} shows 三川明けの明星 pattern - signal detected`);
    });
  });
});

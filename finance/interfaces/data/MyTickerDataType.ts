import { DataTypeBase } from '@common/interfaces/data/DataTypeBase';

export interface MyTickerDataType extends DataTypeBase {
  userId: string;
  exchangeId: string;
  tickerId: string;
  purchaseDate: number;
  purchasePrice: number;
  quantity: number;
  sellDate: number | null;
  sellPrice: number | null;
}

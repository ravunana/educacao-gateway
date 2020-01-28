import { Moment } from 'moment';
import { IEfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

export interface IDeposito {
  id?: number;
  numero?: string;
  dataDeposito?: Moment;
  montante?: number;
  data?: Moment;
  anexoContentType?: string;
  anexo?: any;
  numeroProcesso?: string;
  meioLiquidacao?: string;
  bancoCaixaDescricao?: string;
  bancoCaixaId?: number;
  efeitos?: IEfeitoPagamento[];
}

export class Deposito implements IDeposito {
  constructor(
    public id?: number,
    public numero?: string,
    public dataDeposito?: Moment,
    public montante?: number,
    public data?: Moment,
    public anexoContentType?: string,
    public anexo?: any,
    public numeroProcesso?: string,
    public meioLiquidacao?: string,
    public bancoCaixaDescricao?: string,
    public bancoCaixaId?: number,
    public efeitos?: IEfeitoPagamento[]
  ) {}
}

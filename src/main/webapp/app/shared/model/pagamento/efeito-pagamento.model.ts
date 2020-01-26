import { Moment } from 'moment';
import { IDeposito } from 'app/shared/model/pagamento/deposito.model';

export interface IEfeitoPagamento {
  id?: number;
  descricao?: string;
  quantidade?: number;
  montante?: number;
  desconto?: number;
  multa?: number;
  juro?: number;
  data?: Moment;
  vencimento?: Moment;
  quitado?: boolean;
  depositos?: IDeposito[];
  emolumentoNome?: string;
  emolumentoId?: number;
  pagamentoNumero?: string;
  pagamentoId?: number;
}

export class EfeitoPagamento implements IEfeitoPagamento {
  constructor(
    public id?: number,
    public descricao?: string,
    public quantidade?: number,
    public montante?: number,
    public desconto?: number,
    public multa?: number,
    public juro?: number,
    public data?: Moment,
    public vencimento?: Moment,
    public quitado?: boolean,
    public depositos?: IDeposito[],
    public emolumentoNome?: string,
    public emolumentoId?: number,
    public pagamentoNumero?: string,
    public pagamentoId?: number
  ) {
    this.quitado = this.quitado || false;
  }
}

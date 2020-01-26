import { Moment } from 'moment';
import { IEfeitoPagamento } from 'app/shared/model/pagamento/efeito-pagamento.model';

export interface IPagamentoEmolumento {
  id?: number;
  data?: Moment;
  numero?: string;
  numeroProcesso?: string;
  nomeAluno?: string;
  turmaAluno?: string;
  estado?: string;
  efeitoPagamentos?: IEfeitoPagamento[];
  formaLiquidacaoNome?: string;
  formaLiquidacaoId?: number;
}

export class PagamentoEmolumento implements IPagamentoEmolumento {
  constructor(
    public id?: number,
    public data?: Moment,
    public numero?: string,
    public numeroProcesso?: string,
    public nomeAluno?: string,
    public turmaAluno?: string,
    public estado?: string,
    public efeitoPagamentos?: IEfeitoPagamento[],
    public formaLiquidacaoNome?: string,
    public formaLiquidacaoId?: number
  ) {}
}

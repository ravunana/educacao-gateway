import { IEfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

export interface IEmolumento {
  id?: number;
  nome?: string;
  montante?: number;
  montanteMulta?: number;
  tempoMulta?: number;
  quantidade?: number;
  turno?: string;
  classe?: number;
  curso?: string;
  efeitoPagamentos?: IEfeitoPagamento[];
}

export class Emolumento implements IEmolumento {
  constructor(
    public id?: number,
    public nome?: string,
    public montante?: number,
    public montanteMulta?: number,
    public tempoMulta?: number,
    public quantidade?: number,
    public turno?: string,
    public classe?: number,
    public curso?: string,
    public efeitoPagamentos?: IEfeitoPagamento[]
  ) {}
}

import { IPagamentoEmolumento } from 'app/shared/model/pagamento/pagamento-emolumento.model';

export interface IFormaLiquidacao {
  id?: number;
  nome?: string;
  juro?: number;
  prazoLiquidacao?: number;
  quantidade?: number;
  icon?: string;
  pagamentoEmolumentos?: IPagamentoEmolumento[];
}

export class FormaLiquidacao implements IFormaLiquidacao {
  constructor(
    public id?: number,
    public nome?: string,
    public juro?: number,
    public prazoLiquidacao?: number,
    public quantidade?: number,
    public icon?: string,
    public pagamentoEmolumentos?: IPagamentoEmolumento[]
  ) {}
}
